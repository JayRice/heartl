import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome';
import SwipeApp from './pages/SwipeApp';
import { useAuth } from './hooks/useAuth';
import Onboarding from "./pages/Onboarding.tsx";
import useDatabaseStore from "../store/databaseStore.ts"
import { doc, onSnapshot } from "firebase/firestore";


import {db, storage} from "../src/config/firebase.ts"
import {getDoc} from "firebase/firestore"

import { ref, getDownloadURL } from "firebase/storage";


import {User} from "../src/types/index.ts"
import {Heart} from "lucide-react";
import useStore from "../store/store.ts";

const AppRouter: React.FC = () => {
  const userPrefersDark = localStorage.getItem('theme') === 'dark';
  if (userPrefersDark) {
    document.documentElement.classList.add('dark');
  }
  const { authUser, authUserLoading } = useAuth();




  const [isLoading, setIsLoading] = useState<boolean>(false);


  const user = useDatabaseStore((state) => state.user)
  const setUser = useDatabaseStore((state) => state.setUser)

  const imageUrls = useStore((state) => state.imageUrls)
  const setImageUrls = useStore((state) => state.setImageUrls)

  useEffect(() => {
    async function initUserImages(){

      if (!user) {return}
      const urls: string[] = [];
      const imageIds = user.profile.imageIds;

      if (!imageIds){return}

      await Promise.all(imageIds.map(async imageId => {
        const imageRef = ref(storage, `user-images/${user.id}/${imageId}`);
        const url = await getDownloadURL(imageRef);
        urls.push(url);
      }))
      setImageUrls(urls)
    }
    initUserImages()
  }, [user]);

  useEffect(() => {


    if(!authUser) {return}

    const userRef = doc(db, "users", authUser.uid);


    // Check if data user exists
    getDoc(userRef).then((snapshot) => {
      console.log("Exists: ", snapshot.exists())
      setIsLoading(false);

      if (snapshot.exists()){
        const userData = snapshot.data() as User;
        setUser(userData);
        setIsLoading(false);
      }
    })

    const unsubscribe = onSnapshot(userRef, (snapshot) => {
      setUser(null);
      console.log("Change to user occured")

      if (snapshot.exists()) {
        const userData = snapshot.data() as User;
        setUser(userData);
      }

    });

    return () => unsubscribe(); // cleanup
  }, [authUser]);



  useEffect(() => {
    console.log("loading: ", isLoading)
  }, [isLoading]);




  const isValidUser = user && (user?.profile?.imageIds)


  if (isLoading || authUserLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center bg-gradient-to-br from-pink-500 via-red-500 to-purple-600">
        <Heart className={"w-24 h-24 text-white fill-white pulse-animation "}></Heart>
      </div>
    );
  }


  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={isValidUser ? <SwipeApp />: authUser ? <Onboarding authUser={authUser} /> : <Welcome />}
        />
        <Route
        path="/app/onboarding"
        element={isValidUser ? <SwipeApp />: authUser ? <Onboarding authUser={authUser} /> : <Welcome />}
        ></Route>
        <Route 
          path="/app"
          element={isValidUser ? <SwipeApp />: authUser ? <Onboarding authUser={authUser} /> : <Welcome />}
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;