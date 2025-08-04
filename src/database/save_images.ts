import {storage} from "../config/firebase.ts"
import { ref, uploadBytes } from "firebase/storage";
import {getAuthUser} from "./get.ts"
import {sanitize} from "../logic/constants.ts"


export default async function save_images(files : File[]) : Promise<string[] | null>  {

    const user = await getAuthUser();

    if(!user){
        return null;
    }
    const imageRefs : string[] = []
    for (const file of files) {
        const docId = sanitize(file.name);
        const imageRef = ref(storage, `user-images/${user.uid}/${docId}`);

        await uploadBytes(imageRef, file);

        imageRefs.push(docId);
    }

    return imageRefs;

}