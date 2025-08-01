import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings } from 'lucide-react';
import Header from '../components/Layout/Header';
import BottomNav from '../../src/components/Elements/app/BottomNav.tsx';


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
  const [matches, setMatches] = useState<Match[]>(mockMatches);
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [showMatchNotification, setShowMatchNotification] = useState<User | null>(null);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();




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


      {activeTab === 'discover' && <DiscoverTab />}
      {activeTab === 'matches' && <MatchesTab matches={matches}  chats={chats} setChats={setChats} setActiveTab={setActiveTab} />}
      {activeTab === 'messages' && <MessagesTab selectedChat={selectedChat} chats={chats} setSelectedChat={setSelectedChat} handleSendMessage={handleSendMessage} />}
      {activeTab === 'profile' && <ProfileTab  handleLogout={handleLogout}/>}


      <div className="lg:hidden">
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

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