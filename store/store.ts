
import {create} from "zustand";

//import { User } from 'firebase/auth';
import { User } from "../src/data/interfaces"



type storeType = {
    isDark: boolean;
    setIsDark: () => void;
    user: User,
    setUser: (user: User) => void;
}

export const store = create<storeType>((set) => ({
    isDark: localStorage.getItem("theme") === "dark",
    setIsDark: () => set((state) => {
     const newDark = !state.isDark;
     const root = document.documentElement;

     if(newDark) {
         root.classList.add("dark");
         localStorage.setItem("theme", "dark")
     }else{
         root.classList.remove("dark");
         localStorage.setItem("theme", "light")
     }

     return {isDark: newDark};
    }),
    user: null,
    setUser: (user: User) => set(() => {
        return {user: user}
    })
}))