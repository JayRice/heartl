import MatchCard from "../Matches/MatchCard.tsx";
import {Chat, Match} from "../../types";
import React from "react";

interface Props {
    matches: Match[],
    chats: Chat[],
    setChats: React.Dispatch<React.SetStateAction<Chat[]>>
    setActiveTab: (tab: 'discover' | 'matches' | 'messages' | 'profile') => void,
}
export default function MatchesTab({matches, chats, setChats, setActiveTab}: Props) {
    return (
        <div className="flex-1 p-4 max-w-md mx-auto w-full">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-4">New Matches</h2>
                <div className="flex space-x-4 overflow-x-auto pb-2">
                    {matches.map((match) => (
                        <MatchCard
                            key={match.id}
                            match={match}
                            onClick={() => {
                                setActiveTab('messages');
                                // Create chat for this match if not exists
                                const existingChat = chats.find(c => c.match.id === match.id);
                                if (!existingChat) {
                                    const newChat: Chat = {
                                        id: Date.now().toString(),
                                        match,
                                        messages: [],
                                        unreadCount: 0
                                    };
                                    setChats(prev => [...prev, newChat]);
                                }
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="text-center text-gray-400 mt-12">
                <p>Keep swiping to find more matches!</p>
            </div>
        </div>
    )
}