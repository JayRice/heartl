import React from "react"
import useUIStore from "../../store/UIStore.ts";
import {UI_CHANGE_PIXELS} from "../../src/logic/constants.ts"

export default function usePageFlowModeListener() {
    const setMode = useUIStore((s) => s.setPageFlowMode);

    React.useEffect(() => {
        const updateMode = () => {
            setMode(window.innerWidth < UI_CHANGE_PIXELS ? "mobile" : "desktop");
        };
        window.addEventListener("resize", updateMode);
        return () => window.removeEventListener("resize", updateMode);
    }, [setMode]);
}
