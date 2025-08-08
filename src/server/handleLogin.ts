import {User} from "../types/index.ts";
import {getAuthUser} from "../database/getAuthUser.ts";

export async function handleLogin(dataUser : User) {
    const authUser = getAuthUser();
    if(!authUser) throw new Error("Not signed in");

    const token = await authUser.getIdToken();


    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user_login`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user: dataUser,
        })

    });
    const json = await res.json();
    return json;
}