import { create } from "zustand";

import {UI_CHANGE_PIXELS} from "../src/logic/constants.ts"

type PageFlowMode = "mobile" | "desktop";

interface UIState {
    pageFlowMode: PageFlowMode;
    setPageFlowMode: (mode: PageFlowMode) => void;
}

export const useUIStore = create<UIState>((set) => ({
    pageFlowMode: window.innerWidth < UI_CHANGE_PIXELS ? "mobile" : "desktop",
    setPageFlowMode: (mode) => set({ pageFlowMode: mode }),
}));

// hook to update on resize
export default useUIStore;