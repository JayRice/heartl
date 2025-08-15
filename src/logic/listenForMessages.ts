// data/messages.ts
import { collection, onSnapshot, query } from "firebase/firestore";
import {db} from "../config/firebase.ts";
import { Message } from "../types";

export function listenForMessages(conversationId: string, onMessage: (m: Message) => void) {
    // return firestore onSnapshot cleanup
    return onSnapshot(
        query(collection(db, "conversations", conversationId, "messages")),
        (snap) => {
            snap
                .docChanges()
                .filter((c) => c.type === "added")
                .forEach((c) => onMessage({ ...(c.doc.data() as Message) }));
        }
    );
}