
import {create} from "zustand";
import { persist } from 'zustand/middleware'
import {Conversation, Match, User} from "../src/types/index"

type databaseStoreType = {
    conversations: Conversation[],
    setConversations: (conversations: Conversation[]) => void,
    matches: Match[]
    setMatches: (matches: Match[]) => void,
    user: User | null,
    setUser: (user: User | null) => void;
    swipeBuffer: User[] | null;
    setSwipeBuffer: (swipeBuffer: User[]) => void;
    swipeBufferIndex: number;
    setSwipeBufferIndex: (swipeIndex: number) => void;


}


const useDatabaseStore = create<databaseStoreType>()(
    persist(
        (set) => ({
            conversations: [],
            setConversations: (conversations: Conversation[]) => set({conversations}),
            matches: [],
            setMatches: (matches: Match[]) => set({ matches }),
            user: null,
            setUser: (user: User | null) => set(() => {
                return {user: user}
            }),
            swipeBufferIndex: 0,
            setSwipeBufferIndex: (swipeIndex: number) => set({swipeBufferIndex: swipeIndex}),
            swipeBuffer: null,
            setSwipeBuffer: (swipeBuffer: User[]) => set({swipeBuffer}),


        }),
        {
            name: 'database-store', // required
        }
    )
)

export default useDatabaseStore