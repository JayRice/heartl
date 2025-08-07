import MessageInput from "../Messages/MessageInput.tsx";
import ChatList from "../Messages/ChatList.tsx";
import { Chat } from '../../types';

import SimpleTopNav from "../Layout/SimpleTopNav.tsx"
import {Zap} from "lucide-react";
import React from "react";
import useStore from "../../../store/store.ts";
interface Props {
    selectedChat: Chat | null;
    handleSendMessage: (message: string) => void;
    chats: Chat[];
    setSelectedChat: (chat: Chat) => void;
}
export default function MatchesTab({selectedChat, handleSendMessage, chats, setSelectedChat}: Props) {

    const isCompactMode = useStore((state) => state.isCompactMode);

    return (
        <div className="flex-1 flex flex-col max-w-md mx-auto w-full">
            { !isCompactMode &&
                (
                    <div className={"lg:hidden"}>
                        <SimpleTopNav>
                        </SimpleTopNav>
                    </div>

                )

            }
            {selectedChat ? (
                <>
                    <div className="flex-1 p-4 overflow-y-auto">
                        <div className="text-center mb-4">
                            <img
                                src={selectedChat.match.user.photos[0]}
                                alt={selectedChat.match.user.name}
                                className="w-16 h-16 object-cover rounded-full mx-auto mb-2"
                            />
                            <h3 className="text-white font-semibold">{selectedChat.match.user.name}</h3>
                            <p className="text-gray-400 text-sm">You matched on {selectedChat.match.timestamp.toLocaleDateString()}</p>
                        </div>

                        <div className="space-y-4">
                            {selectedChat.messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.senderId === 'current-user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-xs px-4 py-2 rounded-2xl ${
                                            message.senderId === 'current-user'
                                                ? 'bg-pink-500 text-white'
                                                : 'bg-gray-700 text-white'
                                        }`}
                                    >
                                        {message.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <MessageInput
                        onSendMessage={handleSendMessage}
                        placeholder={`Message ${selectedChat.match.user.name}...`}
                    />
                </>
            ) : (
                <div className="flex-1 p-4">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-white mb-4">Messages</h2>
                        <ChatList
                            chats={chats}
                            onChatSelect={setSelectedChat}
                        />
                    </div>

                    {chats.length === 0 && (
                        <div className="text-center text-gray-400 mt-12">
                            <p>No messages yet. Start swiping to find matches!</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}