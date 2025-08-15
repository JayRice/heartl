import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase.ts";




import {User} from "../types";

export default async function getMatches(matchIds: string[]): Promise<User[]> {

    if (!matchIds.length) return [];

    const usersRef = collection(db, "users");
    console.log("1: ", matchIds)

    const snapshot = await getDocs(query(usersRef, where("id", "in", matchIds)))


    const docs = snapshot.docs.map((d) => d.data() as User)

    return docs;
}