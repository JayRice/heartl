import {User} from "../types";
import {getAuthUser} from "../database/getAuthUser.ts";
import useStore from "../../store/store.ts";
export default async function fillSwipeBuffer(fillType: "full" | "one", user: User) {
    const authUser = getAuthUser();
    if(!authUser) throw new Error("Not signed in");

    const token = await authUser.getIdToken();

    const {
        swipeBuffer,
        lastMatch
    } = useStore.getState();


    console.log("ids: ", swipeBuffer?.length,   [...(swipeBuffer ? swipeBuffer.map(match => match.id) : [])]);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/fill_swipe_buffer`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fillType: fillType,
            user: user,
            swipeBufferIds: [ ...(swipeBuffer ? swipeBuffer.map(match => match.id) : []),
                            lastMatch?.id]
        })

    });
    const json = await res.json();

    return json;
}
