
import {create} from "zustand";



type storeType = {
    isDark: boolean;
    setIsDark: () => void;
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
    })
}))