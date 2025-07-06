import { useState, useEffect } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { auth } from '../config/firebase';

export const useAuth = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    // Placeholder for actual Firebase auth
    setUser({ email, uid: 'demo-user' } as FirebaseUser);
  };

  const signup = async (email: string, password: string) => {
    // Placeholder for actual Firebase auth
    setUser({ email, uid: 'demo-user' } as FirebaseUser);
  };

  const logout = async () => {
    setUser(null);
  };

  return { user, loading, login, signup, logout };
};