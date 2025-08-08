import {User} from "../types";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../config/firebase.ts";
import {getAuthUser} from "./getAuthUser.ts";

export default async function getUser() : Promise<null | User> {

    const authUser = getAuthUser();
    if(!authUser){
        return null;
    }

    const docRef = doc(db, "users", authUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()){
        return docSnap.data() as User;
    }
    return null;
}