import React from 'react';
import { Chat } from '../../types';

interface ChatListProps {
  chats: Chat[];
  onChatSelect: (chat: Chat) => void;
}

const ChatList: React.FC<ChatListProps> = ({ chats, onChatSelect }) => {
  return (
    <div className="space-y-4">
      {chats.map((chat) => (
        <div
          key={chat.id}
          onClick={() => onChatSelect(chat)}
          className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg cursor-pointer transition-colors"
        >
          <div className="relative">
            <img
              src={chat.match.user.photos[0]}
              alt={chat.match.user.name}
              className="w-12 h-12 object-cover rounded-full"
            />
            {chat.unreadCount && chat.unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">{chat.unreadCount}</span>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white truncate">{chat.match.user.name}</h3>
              {chat.lastMessage && (
                <span className="text-xs text-gray-400">
                  {new Date(chat.lastMessage.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              )}
            </div>
            {chat.lastMessage && (
              <p className="text-sm text-gray-400 truncate">{chat.lastMessage.content}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;