import {getAuthUser} from "../database/getAuthUser.ts";
import {User} from "../types/index"
export default async function verifyImages(files: File[], user: User) {
    const authUser = getAuthUser();
    if(!authUser){return}

    const idToken = await authUser.getIdToken();
    const formData = new FormData();
    formData.append("user", JSON.stringify(user));

    files.forEach((file, index) => {
        formData.append(`file-${index}`, file);
    });

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/verify_images`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${idToken}`,
            // ❌ Do NOT set Content-Type manually with FormData!
        },
        body: formData,
    });

    const json = await res.json();
    return json;
}