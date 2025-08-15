import {Message} from "../types";
import {getAuthUser} from "../database/getAuthUser.ts";


export default async function handleMessage(message: Message) {
    const authUser = getAuthUser();
    if(!authUser) throw new Error("Not signed in");

    const token = await authUser.getIdToken();

    let res = null;
    try {
        res = await fetch(`${import.meta.env.VITE_API_URL}/api/handle_message`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message,
            })

        });

    }catch(error){
        return {error: error};
    }
    const json = await res?.json();
    return json;



}
