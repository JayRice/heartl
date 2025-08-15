import { create } from "zustand";
import { Message } from "../src/types";

type MessagesState = {
    messagesByConversation: Record<string, Message[]>;
    setMessages: (conversationId: string, messages: Message[]) => void;
    addMessage: (conversationId: string, message: Message) => void;
};

export const useMessagesStore = create<MessagesState>((set) => ({
    messagesByConversation: {},

    setMessages: (conversationId, messages) =>
        set((state) => ({
            messagesByConversation: {
                ...state.messagesByConversation,
                [conversationId]: messages,
            },
        })),

    addMessage: (conversationId, message) =>
        set((state) => {
            const existing = state.messagesByConversation[conversationId] || [];
            return {
                messagesByConversation: {
                    ...state.messagesByConversation,
                    [conversationId]: [...existing, message],
                },
            };
        }),
}));
