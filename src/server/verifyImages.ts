import {getAuthUser} from "../database/get.ts";
import {User} from "../types/index"
export default async function verifyImages(docIds: string[], user: User) {
    const authUser = getAuthUser();
    if(!authUser){return}

    const idToken = await authUser.getIdToken();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/verify_images`,  {
        method: "POST",
        headers: {
            Authorization: `Bearer ${idToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user: user,
            docIds: docIds
        })
    })

    const json = await res.json();
    return json;
}