import {User} from "../types";
import {getAuthUser} from "../database/get.ts";
import {toast} from "react-hot-toast"
export default async function fillSwipeBuffer(fillType: "full" | "one", user: User) {
    const authUser = getAuthUser();
    if(!authUser) throw new Error("Not signed in");

    const token = await authUser.getIdToken();


    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/fill_swipe_buffer`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fillType: fillType,
            user: user,
        })

    });
    const json = await res.json();

    return json;
}
