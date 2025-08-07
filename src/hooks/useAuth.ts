import { useState, useEffect } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { auth } from '../config/firebase';
import useDatabaseStore from "../../store/databaseStore.ts";

export const useAuth = () => {
  const [authUser, setAuthUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {


    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAuthUser(user);
      setLoading(false);

    });

    return () => unsubscribe();
  }, []);




  return { authUser, authUserLoading: loading };
};