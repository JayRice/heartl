import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome';
import SwipeApp from './pages/SwipeApp';
import { useAuth } from './hooks/useAuth';
import Onboarding from "./pages/Onboarding.tsx";
import useDatabaseStore from "../store/databaseStore.ts"
import { doc, onSnapshot } from "firebase/firestore";
import {db} from "../src/config/firebase.ts"
import {getDoc} from "firebase/firestore"


import {User} from "../src/types/index.ts"
import {Heart} from "lucide-react";

const AppRouter: React.FC = () => {
  const userPrefersDark = localStorage.getItem('theme') === 'dark';
  if (userPrefersDark) {
    document.documentElement.classList.add('dark');
  }
  const { authUser, authUserLoading } = useAuth();




  const [isLoading, setIsLoading] = useState<boolean>(false);


  const storedDataUser = useDatabaseStore((state) => state.user)


  const setStoredDataUser = useDatabaseStore((state) => state.setUser)

  useEffect(() => {

  }, []);

  useEffect(() => {


    if(!authUser) {return}

    const userRef = doc(db, "users", authUser.uid);

    // Check if data user exists
    getDoc(userRef).then((snapshot) => {
      console.log("Exists: ", snapshot.exists())
      setIsLoading(false);

      if (snapshot.exists()){
        const userData = snapshot.data() as User;
        // const imageIds = userData.profile.imageIds;
        //
        //
        // if (!imageIds || (imageIds && imageIds.length < 2)) {
        //   return setIsLoading(true);
        // }
        setStoredDataUser(userData);
        setIsLoading(false);
      }
    })

    const unsubscribe = onSnapshot(userRef, (snapshot) => {
      setStoredDataUser(null);
      console.log("Change to user occured")

      if (snapshot.exists()) {
        const userData = snapshot.data() as User;
        setStoredDataUser(userData);
      }

    });

    return () => unsubscribe(); // cleanup
  }, [authUser]);



  useEffect(() => {
    console.log("loading: ", isLoading)
  }, [isLoading]);






  if (isLoading || authUserLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center bg-gradient-to-br from-pink-500 via-red-500 to-purple-600">
        <Heart className={"w-24 h-24 text-white fill-white pulse-animation "}></Heart>
      </div>
    );
  }

  console.log("stored date user: ", storedDataUser)

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={storedDataUser ? <SwipeApp />: authUser ? <Onboarding authUser={authUser} /> : <Welcome />}
        />
        <Route
        path="/app/onboarding"
        element={storedDataUser ? <SwipeApp />: authUser ? <Onboarding authUser={authUser} /> : <Welcome />}
        ></Route>
        <Route 
          path="/app"
          element={storedDataUser ? <SwipeApp />: authUser ? <Onboarding authUser={authUser} /> : <Welcome />}
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;