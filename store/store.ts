
import {create} from "zustand";

//import { User } from 'firebase/auth';
import { User } from "../src/data/interfaces"



type storeType = {
    isDark: boolean;
    setIsDark: () => void;
    user: User | null,
    setUser: (user: User) => void;
    thresholdRatio: [number, number];
    setThresholdRatio: (threshold: [number, number]) => void;

    // Only for testing purposes
    currentUserIndex: number;
    setCurrentUserIndex: (index: number) => void;
}

const useStore = create<storeType>((set) => ({
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
    }),
    thresholdRatio: [0,0],
    setThresholdRatio: (threshold: [number, number]) => set(() => {
        return {thresholdRatio: [threshold[0], threshold[1]]}
    }),

    // Change this to swipeBuffer when implementing swipe
    currentUserIndex: 0,
    setCurrentUserIndex: (index: number) => set(() => {
        return {currentUserIndex: index}
    })
}))

export default useStore;