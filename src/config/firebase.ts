import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "heartl.firebaseapp.com",
  projectId: "heartl",
  storageBucket: "heartl.firebasestorage.app",
  messagingSenderId: "926336954565",
  appId: "1:926336954565:web:4fc3b1af6eb11dd75900ac",
  measurementId: "G-J8ESYS1B3L"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


export default app;