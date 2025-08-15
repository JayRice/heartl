
import {create} from "zustand";
import {User} from "../src/types";

//import { User } from 'firebase/auth';


type PageFlowMode = "mobile" | "desktop";

type storeType = {
    isDark: boolean;
    setIsDark: () => void;


    thresholdRatio: [number, number];
    setThresholdRatio: (threshold: [number, number]) => void;

    isCompactMode: boolean;
    setIsCompactMode: (isCompactMode: boolean) => void;

    isLoadingMatches: boolean;
    setIsLoadingMatches: (isLoadingMatches: boolean) => void;

    imageUrls: string[] | null;
    setImageUrls: (imageUrls: string[] | null) => void;

    swipeBuffer: User[] | null;
    setSwipeBuffer: (
        value: User[] | null | ((prev: User[] | null) => User[] | null)
    ) => void;

    lastMatch: User | null;
    setLastMatch: (lastMatch: User | null) => void;

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

    thresholdRatio: [0,0],
    setThresholdRatio: (threshold: [number, number]) => set(() => {
        return {thresholdRatio: [threshold[0], threshold[1]]}
    }),

    isCompactMode: false,
    setIsCompactMode: (isCompactMode: boolean) => set(() => {
        return {isCompactMode: isCompactMode}
    }),

    isLoadingMatches: false,
    setIsLoadingMatches: (isLoadingMatches: boolean) => set({isLoadingMatches}),

    imageUrls: null,
    setImageUrls: (imageUrls: string[] | null) => set({imageUrls}),

    swipeBuffer: null,
    setSwipeBuffer: (value) =>
        set((state) => ({
            swipeBuffer:
                typeof value === "function"
                    ? (value as (p: User[] | null) => User[] | null)(state.swipeBuffer)
                    : value,
        })),


    lastMatch: null,
    setLastMatch: (lastMatch: User | null) => set({lastMatch}),
}))

export default useStore;