import { create } from "zustand";
import { Message } from "../src/types";
type State = {
    messagesByConversation: Record<string, Message[]>;
    setMessages: (conversationId: string, msgs: Message[]) => void;
    addMessage: (conversationId: string, msg: Message) => void;
};

export const useMessagesStore = create<State>((set, get) => ({
    messagesByConversation: {},
    setMessages: (conversationId, msgs) =>
        set((s) => ({
            messagesByConversation: {
                ...s.messagesByConversation,
                [conversationId]: dedupeById(msgs),
            },
        })),
    addMessage: (conversationId, msg) =>
        set((s) => {
            const existing = s.messagesByConversation[conversationId] ?? [];
            if (existing.some((m) => m.id === msg.id)) return s; // dedupe
            return {
                messagesByConversation: {
                    ...s.messagesByConversation,
                    [conversationId]: [...existing, msg],
                },
            };
        }),
}));

function dedupeById(list: Message[]) {
    const map = new Map<string, Message>();
    for (const m of list) map.set(m.id, m);
    return [...map.values()];
}