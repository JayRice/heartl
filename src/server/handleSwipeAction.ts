import {SwipeAction, User} from "../types";
import {getAuthUser} from "../database/getAuthUser.ts";

export default async function handleSwipeAction(action : SwipeAction, uid: string, otherUid: string) {
    const authUser = getAuthUser();
    if(!authUser) throw new Error("Not signed in");

    const token = await authUser.getIdToken();



    console.log("WOAHHHH");

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/handle_swipe_action`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            uid: uid,
            otherUid: otherUid,
            swipeAction: action
        })

    });
    const json = await res.json();
    return json;

}
