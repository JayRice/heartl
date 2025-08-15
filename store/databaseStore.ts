
import {create} from "zustand";
import { persist } from 'zustand/middleware'
import {Conversation, Match, User} from "../src/types/index"

type databaseStoreType = {
    conversations: Conversation[],
    setConversations: (conversations: Conversation[]) => void,

    matches: User[]
    setMatches: (matches: User[]) => void,

    user: User | null,
    setUser: (user: User | null) => void;

    swipeBufferIndex: number;
    setSwipeBufferIndex: (swipeIndex: number) => void;


}


const useDatabaseStore = create<databaseStoreType>()(
    persist(
        (set) => ({
            conversations: [],
            setConversations: (conversations: Conversation[]) => set({conversations}),
            matches: [],
            setMatches: (matches: User[]) => set({ matches }),
            user: null,
            setUser: (user: User | null) => set(() => {
                return {user: user}
            }),
            swipeBufferIndex: 0,
            setSwipeBufferIndex: (swipeIndex: number) => set({swipeBufferIndex: swipeIndex}),


        }),
        {
            name: 'database-store', // required
        }
    )
)

export default useDatabaseStore