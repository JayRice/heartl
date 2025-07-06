import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Zap } from 'lucide-react';
import Header from '../components/Layout/Header';
import BottomNav from '../components/Layout/BottomNav';
import SwipeCard from '../components/Cards/SwipeCard';
import SwipeActions from '../components/Cards/SwipeActions';
import MatchCard from '../components/Matches/MatchCard';
import ChatList from '../components/Messages/ChatList';
import MessageInput from '../components/Messages/MessageInput';
import MatchNotification from '../components/Notifications/MatchNotification';
import { mockUsers, mockMatches, mockChats } from '../data/mockData';
import { User, Match, Chat } from '../types';
import { useAuth } from '../hooks/useAuth';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'discover' | 'matches' | 'messages' | 'profile'>('discover');
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [matches, setMatches] = useState<Match[]>(mockMatches);
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [showMatchNotification, setShowMatchNotification] = useState<User | null>(null);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSwipe = (direction: 'left' | 'right' | 'up') => {
    const currentUser = mockUsers[currentUserIndex];
    
    if (direction === 'right' || direction === 'up') {
      // Simulate match logic
      const isMatch = Math.random() > 0.5;
      if (isMatch) {
        setShowMatchNotification(currentUser);
        // Add to matches
        const newMatch: Match = {
          id: Date.now().toString(),
          user: currentUser,
          timestamp: new Date(),
          isNew: true
        };
        setMatches(prev => [newMatch, ...prev]);
      }
    }
    
    setCurrentUserIndex(prev => (prev + 1) % mockUsers.length);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleSendMessage = (message: string) => {
    if (selectedChat) {
      // Add message logic here
      console.log('Sending message:', message);
    }
  };

  const renderDiscoverTab = () => (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 relative p-4 max-w-md mx-auto w-full">
        <div className="relative h-full min-h-[600px]">
          {mockUsers.slice(currentUserIndex, currentUserIndex + 3).map((user, index) => (
            <SwipeCard
              key={user.id}
              user={user}
              onSwipe={handleSwipe}
              style={{
                zIndex: 3 - index,
                transform: `scale(${1 - index * 0.05}) translateY(${index * 4}px)`,
                opacity: 1 - index * 0.3
              }}
            />
          ))}
        </div>
        
        <SwipeActions
          onUndo={() => console.log('Undo')}
          onPass={() => handleSwipe('left')}
          onSuperLike={() => handleSwipe('up')}
          onLike={() => handleSwipe('right')}
          onBoost={() => console.log('Boost')}
        />
      </div>
    </div>
  );

  const renderMatchesTab = () => (
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
  );

  const renderMessagesTab = () => (
    <div className="flex-1 flex flex-col max-w-md mx-auto w-full">
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
  );

  const renderProfileTab = () => (
    <div className="flex-1 p-4 max-w-md mx-auto w-full">
      <div className="text-center">
        <img
          src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200"
          alt="Profile"
          className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold text-white mb-2">Your Profile</h2>
        <p className="text-gray-400 mb-8">Manage your profile and settings</p>
        
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-2xl transition-colors"
        >
          Log Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header
        showLogo={activeTab === 'discover'}
        title={
          activeTab === 'matches' ? 'Matches' :
          activeTab === 'messages' ? (selectedChat ? selectedChat.match.user.name : 'Messages') :
          activeTab === 'profile' ? 'Profile' : undefined
        }
        rightIcon={
          activeTab === 'discover' ? <Settings className="h-6 w-6" /> :
          activeTab === 'messages' && selectedChat ? (
            <button onClick={() => setSelectedChat(null)}>
              ← Back
            </button>
          ) : undefined
        }
      />
      
      {activeTab === 'discover' && renderDiscoverTab()}
      {activeTab === 'matches' && renderMatchesTab()}
      {activeTab === 'messages' && renderMessagesTab()}
      {activeTab === 'profile' && renderProfileTab()}
      
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      
      {showMatchNotification && (
        <MatchNotification
          user={showMatchNotification}
          onClose={() => setShowMatchNotification(null)}
          onSendMessage={() => {
            setShowMatchNotification(null);
            setActiveTab('messages');
          }}
        />
      )}
    </div>
  );
};

export default App;