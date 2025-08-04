
import {create} from "zustand";
import { persist } from 'zustand/middleware'
import { User } from "../src/data/interfaces"





import {Conversation, Match} from "../src/types/index"

type databaseStoreType = {
    conversations: Conversation[],
    setConversations: (conversations: Conversation[]) => void,
    matches: Match[]
    setMatches: (matches: Match[]) => void,
    user: User | null,
    setUser: (user: User) => void;
}


const useDatabaseStore = create<databaseStoreType>()(
    persist(
        (set) => ({
            conversations: [],
            setConversations: (conversations: Conversation[]) => set({conversations}),
            matches: [],
            setMatches: (matches: Match[]) => set({ matches }),
            user: null,
            setUser: (user: User) => set(() => {
                return {user: user}
            }),
        }),
        {
            name: 'database-store', // required
        }
    )
)

export default useDatabaseStore