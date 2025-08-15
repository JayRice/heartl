// data/messages.ts
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import {db} from "../config/firebase.ts";
import { Message } from "../types";
import {useMessagesStore} from "../../store/messagesStore.ts"; // your simple store

export function listenForMessages(conversationId: string) {
    const col = collection(db, "conversations", conversationId, "messages");
    const q = query(col, orderBy("createdAt", "asc")); // oldest → newest

    // Listen in real time
    const unsubscribe = onSnapshot(q, (snap) => {
        const msgs: Message[] = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Message));
        console.log("new messages: ", msgs);
        // replace that convo’s messages in your store
        useMessagesStore.getState().setMessages(conversationId, msgs);
    });

    return unsubscribe; // call this when you leave the convo
}