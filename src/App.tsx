import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome';
import App from './pages/App';
import { useAuth } from './hooks/useAuth';
import Onboarding from "./pages/Onboarding.tsx";
import useDatabaseStore from "../store/databaseStore.ts"

import {getDataUser} from "./database/get.ts";

import {User} from "../src/types/index.ts"

const AppRouter: React.FC = () => {
  const userPrefersDark = localStorage.getItem('theme') === 'dark';
  if (userPrefersDark) {
    document.documentElement.classList.add('dark');
  }
  const { authUser, loading } = useAuth();


  const [DataUser, setDataUser] = useState<User | null>(null);

  const storedDataUser = useDatabaseStore((state) => state.user);
  const setStoredDataUser = useDatabaseStore((state) => state.setUser)


  useEffect(() => {
    // if data user not already cached
    async function getUser(){
      if(!storedDataUser) {
        const user = await getDataUser();
        setStoredDataUser(user);
        return setDataUser(user);
      }
      setDataUser(storedDataUser);
    }
    getUser();
  }, [storedDataUser]);






  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={DataUser ? <App />: authUser ? <Onboarding authUser={authUser} /> : <Welcome />}
        />
        <Route
        path="/app/onboarding"
        element={DataUser ? <App />: authUser ? <Onboarding authUser={authUser} /> : <Welcome />}
        ></Route>
        <Route 
          path="/app"
          element={DataUser ? <App />: authUser ? <Onboarding authUser={authUser} /> : <Welcome />}
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;