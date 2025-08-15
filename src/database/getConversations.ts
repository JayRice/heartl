import { db } from "../config/firebase.ts";




import {Conversation} from "../types";

import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import {getAuthUser} from "./getAuthUser.ts";

export default async function getConversations(): Promise<Conversation[]> {
    const authUser = await getAuthUser();

    if(!authUser){
        return [];
    }

    const convosRef = collection(db, "conversations");

    const snapshot = await getDocs(
        query(
            convosRef,
            where("participantIds", "array-contains", authUser.uid),
            orderBy("updatedAt", "desc"),
            limit(50) // optional pagination limit
        )
    );

    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Conversation));
}
