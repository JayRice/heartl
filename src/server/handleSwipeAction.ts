import {SwipeAction, User} from "../types";
import {getAuthUser} from "../database/get.ts";

export async function handleSwipeAction(action : SwipeAction, user: User, otherUser: User) {
    const authUser = getAuthUser();
    if(!authUser) throw new Error("Not signed in");

    const token = await authUser.getIdToken();


    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/handle_swipe_action`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user: user,
            otherUser: otherUser,
            swipeAction: action
        })

    });
    const json = await res.json();
    return json;

}
