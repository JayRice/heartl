import {getAuth} from "firebase/auth";
import {app} from "../config/firebase.ts";

const auth = getAuth(app);

export  function getAuthUser(){
    return auth.currentUser;
}

