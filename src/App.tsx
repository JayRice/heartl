import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome';
import App from './pages/App';
import { useAuth } from './hooks/useAuth';
import Onboarding from "./pages/Onboarding.tsx";
import useDatabaseStore from "../store/databaseStore.ts"
import { doc, onSnapshot } from "firebase/firestore";
import {db} from "../src/config/firebase.ts"



import {getDataUser} from "./database/get.ts";

import {User} from "../src/types/index.ts"
import {Heart} from "lucide-react";

const AppRouter: React.FC = () => {
  const userPrefersDark = localStorage.getItem('theme') === 'dark';
  if (userPrefersDark) {
    document.documentElement.classList.add('dark');
  }
  const { authUser, loading } = useAuth();

  const [isLoadingUser, setIsLoadingUser] = useState(true);



  const [isValidUser, setIsValidUser] = useState<boolean>(false);

  const setStoredDataUser = useDatabaseStore((state) => state.setUser)



  useEffect(() => {
    if(!authUser) {return}

    const userRef = doc(db, "users", authUser.uid);

    const unsubscribe = onSnapshot(userRef, (snapshot) => {


      if (!snapshot.exists()) {
        setIsLoadingUser(false);
        setStoredDataUser({
          id: authUser.uid,
          email: authUser.email,
          name: "",
          birthday: ["", "", ""],
          gender: null,
          interested_in: null,
          intent: null
        } );
      } else {
        const userData = snapshot.data() as User;
        setStoredDataUser(userData);

        const imageIds = userData.imageIds;

        console.log("Image Ids: ", imageIds)


        if(!imageIds || (imageIds && imageIds.length < 2)){
          return setIsValidUser(false);
        }
        setIsValidUser(true);
        setIsLoadingUser(false);
      }



    });


    return () => unsubscribe(); // cleanup
  }, [authUser]);


  useEffect(() => {
    console.log("Valid: ", isValidUser)
  }, [isValidUser]);






  if (loading || isLoadingUser) {
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
          element={isValidUser ? <App />: authUser ? <Onboarding authUser={authUser} /> : <Welcome />}
        />
        <Route
        path="/app/onboarding"
        element={isValidUser ? <App />: authUser ? <Onboarding authUser={authUser} /> : <Welcome />}
        ></Route>
        <Route 
          path="/app"
          element={isValidUser ? <App />: authUser ? <Onboarding authUser={authUser} /> : <Welcome />}
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;