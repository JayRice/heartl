import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings } from 'lucide-react';
import Header from '../components/Layout/Header';
import BottomNav from '../components/Layout/BottomNav';


import MatchNotification from '../components/Notifications/MatchNotification';
import { mockUsers, mockMatches, mockChats } from '../data/mockData';
import { User, Match, Chat } from '../types';
import { useAuth } from '../hooks/useAuth';

import DiscoverTab from "../components/Tabs/DiscoverTab"
import MatchesTab from "../components/Tabs/MatchesTab.tsx"
import MessagesTab from "../components/Tabs/MessagesTab.tsx"
import ProfileTab from "../components/Tabs/ProfileTab.tsx"





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




  return (
    <div className="min-h-screen bg-gray-900 flex flex-col overflow-x-hidden">
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

      {activeTab === 'discover' && <DiscoverTab currentUserIndex={currentUserIndex} handleSwipe={handleSwipe} />}
      {activeTab === 'matches' && <MatchesTab matches={matches}  chats={chats} setChats={setChats} setActiveTab={setActiveTab} />}
      {activeTab === 'messages' && <MessagesTab selectedChat={selectedChat} chats={chats} setSelectedChat={setSelectedChat} handleSendMessage={handleSendMessage} />}
      {activeTab === 'profile' && <ProfileTab  handleLogout={handleLogout}/>}

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