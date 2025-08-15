import { useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import SwipeCard from "../../Elements/app/SwipeCard";
import Button from "../../Elements/Button";
import { useMessagesStore } from "../../../../store/messagesStore";
import getMessages from "../../../database/getMessages";
import { listenForMessages } from "../../../logic/listenForMessages";
import handleMessage from "../../../server/handleMessage";
import {Conversation, Message, User} from "../../../types";
import useDatabaseStore from "../../../../store/databaseStore";

import { unstable_batchedUpdates } from "react-dom";
import useUIStore from "../../../../store/UIStore.ts";

type Props = {
    selectedMatch: User;
    conversations: Conversation[];
    onClose: () => void;
};

export default function ConversationModal({ selectedMatch, conversations, onClose }: Props) {
    const user = useDatabaseStore((s) => s.user);

    const setConversationMessages = useMessagesStore((s) => s.setMessages);
    const addMessage = useMessagesStore((s) => s.addMessage);
    const messagesByConversation = useMessagesStore((s) => s.messagesByConversation);

    const [draft, setDraft] = useState("");
    // ✅ multiple pending messages keyed by localKey
    const [pendingMessages, setPendingMessages] = useState<Record<string, Message>>({});

    const messageListRef = useRef<HTMLDivElement>(null)

    const pageFlowMode = useUIStore((s) => s.pageFlowMode);

    const conversation = useMemo(() => {
        return conversations.find((c) => c.participantIds.includes(selectedMatch.id)) ?? null;
    }, [conversations, selectedMatch]);

    const conversationId = conversation?.id ?? null;

    const messages = useMemo(() => {
        if (!conversationId) return [];
        const list = messagesByConversation[conversationId] ?? [];
        return [...list].sort((a, b) => {
            const ta = (a)?.createdAt?.toMillis?.() ?? new Date(a.createdAt as any).getTime();
            const tb = (b)?.createdAt?.toMillis?.() ?? new Date(b.createdAt as any).getTime();
            return ta - tb;
        });
    }, [messagesByConversation, conversationId]);

    // StrictMode guard to avoid double listener
    const listenerAttached = useRef(false);

    useEffect(() => {

        messageListRef.current?.scrollTo({behavior: "smooth",   top: messageListRef.current.scrollHeight});

        setPendingMessages({})
    }, [selectedMatch]);

    useEffect(() => {
        if (!user || !conversationId) return;

        let unsub: (() => void) | undefined;
        let cancelled = false;

        (async () => {
            const history = await getMessages(conversationId);
            if (cancelled) return;
            setConversationMessages(conversationId, history);

            if (!listenerAttached.current) {
                unsub = listenForMessages(conversationId, (incoming: Message) => {
                    unstable_batchedUpdates(() => {
                        // ✅ if server echoes localKey, drop matching pending
                        if (incoming.localKey) {

                        }
                        addMessage(conversationId, incoming); // store dedupes by id
                    })
                });
                listenerAttached.current = true;
            }
        })();

        return () => {
            cancelled = true;
            if (unsub) unsub();
            listenerAttached.current = false;
        };
    }, [user, conversationId, setConversationMessages, addMessage]);

    useEffect(() => {
        if (!messageListRef.current) return;
        messageListRef.current.scrollTo({behavior: "smooth", top: messageListRef.current?.scrollHeight });
    }, [messageListRef]);

    const handleSend = () => {
        if (!user || !conversationId) return;
        const content = draft.trim();
        if (!content) return;

        const localKey = crypto.randomUUID();

        messageListRef.current?.scrollTo({behavior: "smooth",   top: messageListRef.current.scrollHeight});

        const newMessage: Message = {
            id: "",
            localKey,
            receiverId: selectedMatch.id,
            senderId: user.id,
            status: "pending",
            content: content,
            createdAt: new Date(),
        };

        // ✅ add to pending map
        setPendingMessages((prev) => ({ ...prev, [localKey]: newMessage }));

        handleMessage(newMessage).then((response) => {
            // if server fails, mark just this pending as failed
            if (response?.error) {
                setPendingMessages((prev) => {
                    const m = prev[localKey];
                    if (!m) return prev;
                    return { ...prev, [localKey]: { ...m, status: "failed" } };
                });
            }
        });

        setDraft("");
    };

    if (!user || !conversationId) return null;

    // ✅ merge pending messages without duplicating ones already confirmed (by localKey)
    const pendingList = Object.values(pendingMessages).filter((p: Message) => p.receiverId == selectedMatch.id);
    const messageList = [
        ...messages,
        ...pendingList.filter(
            (p) => !messages.some((m) =>  m.localKey === p.localKey)
        ),
    ];

    return (
        <div
            onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && !(e.nativeEvent as any).isComposing) {
                    e.preventDefault();
                    handleSend();
                }
            }}
            className="absolute flex flex-row w-full h-screen  top-0 bg-app_primary z-30 overflow-hidden"
        >
            <div className="relative w-full min-h-full flex flex-col min-h-0 overflow-hidden">
                {/* Header */}
                <div className="shrink-0 w-full h-20 flex items-center border-b border-r border-complementary gap-4">
                    <X onClick={onClose} className="absolute w-10 h-10 cursor-pointer hover:scale-110 transition-transform right-4 p-2" />
                    <div className="ml-2 rounded-full w-14 h-14 overflow-hidden">
                        {selectedMatch.data?.imageUrls?.[0] && (
                            <img src={selectedMatch.data.imageUrls[0]} className="w-full h-full" />
                        )}
                    </div>
                    <h1 className="font-light text-2xl">You matched with {selectedMatch.profile.name} on ...</h1>
                </div>

                {/* Messages scroller */}
                <div ref={messageListRef} className="flex-1 min-h-0  overflow-y-auto p-2 space-y-8 py-32">
                    {messageList.map((msg, index) => (
                        <div className={"relative"}>
                            <p
                                key={msg.localKey ?? msg.id}
                                className={`w-1/2 p-2 text-white rounded-md ${
                                    msg.senderId === user.id ? "bg-gray-800" : "bg-red-600 ml-auto"
                                }`}
                            >
                                {msg.content}
                            </p>
                            {  (
                                <span className={`absolute ${(msg.localKey && msg.localKey in pendingMessages ) ? "fade-message":"hidden"}  ml-2 text-white ${ msg.status == "failed" && "text-red-800"}`}>
                                {msg.status == "sent" ? "Sent" : msg.status == "pending" ? "Sending" : "Failed To Send"}
                              </span>
                            )}
                        </div>
                    ))}

                </div>

                {/* Input bar */}
                <div className="shrink-0 flex gap-2 justify-center w-full h-16 border-t border-complementary p-2">
                    <input
                        className="w-1/2 text-lg bg-app_primary rounded-md"
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        placeholder="Type a message"
                    />
                    <Button disabled={!draft.trim()} onClick={handleSend} className="w-32 flex justify-center items-center">
                        <p className="text-md">Send</p>
                    </Button>
                </div>
            </div>

            { pageFlowMode == "desktop" && <div className="relative w-1/3 h-full border-l border-complementary">
                <SwipeCard user={selectedMatch} isCompactMode />
            </div>}
        </div>
    );
}
