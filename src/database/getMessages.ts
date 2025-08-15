import { getAuthUser } from "./getAuthUser";
import { Message } from "../types";
import { db } from "../config/firebase.ts"; // your Firestore client config
import {collection, doc, getDoc, getDocs, orderBy, query} from "firebase/firestore";

export default async function getMessages(conversationId: string): Promise<Message[]> {
    const authUser =  getAuthUser();

    if (!authUser) {
        return [];
    }

    // Messages are stored in: messages/{conversationId}/messages
    const messagesRef = collection(db, "conversations", conversationId, "messages");

    // Query ordered by creation time
    const q = query(messagesRef, orderBy("createdAt", "asc"));


    let snapshot = null;
    try{
         snapshot = await getDocs(q);

    }catch(e){
        console.error(e);
    }

    if(!snapshot){return []}

    const messages: Message[] = snapshot.docs.map((doc) => doc.data() as Message);

    console.log("messages", messages);
    return messages;
}

