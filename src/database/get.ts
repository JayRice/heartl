import {getAuth} from "firebase/auth";
import {app, db} from "../config/firebase.ts";
import {doc, getDoc} from "firebase/firestore"
import {User} from "../types";



const auth = getAuth(app);

export  function getAuthUser(){
    return auth.currentUser;
}

export async function getDataUser() : Promise<null | User> {

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