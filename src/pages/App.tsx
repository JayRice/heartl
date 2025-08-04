import React, {useState, useRef, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings } from 'lucide-react';
import Header from '../components/Layout/Header';
import BottomNav from '../../src/components/Elements/app/BottomNav.tsx';


import MatchNotification from '../components/Notifications/MatchNotification';
import { mockUsers, mockMatches, mockChats } from '../data/mockData';
import { User, Match, Chat } from '../types';
import { useAuth } from '../hooks/useAuth';

import RecsTab from "../components/Tabs/RecsTab.tsx"
import DiscoverTab from "../components/Tabs/DiscoverTab.tsx"
import MessagesTab from "../components/Tabs/MessagesTab.tsx"
import ProfileTab from "../components/Tabs/ProfileTab.tsx"
import useStore from "../../store/store.ts";
import SideNav from "../components/Elements/app/SideNav";





const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'recs' | 'discover' | 'messages' | 'profile'>('discover');
  const [matches, setMatches] = useState<Match[]>(mockMatches);
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [showMatchNotification, setShowMatchNotification] = useState<User | null>(null);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const isCompactMode = useStore((state) => state.isCompactMode);






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



  const sideNavRef = useRef<HTMLDivElement>(null);


  return (
    <div className=" min-h-screen h-screen bg-primary flex flex-row overflow-x-hidden">

      { (activeTab != "recs" ||  (sideNavRef.current && sideNavRef.current.clientWidth >= 1024) ) && <div ref={sideNavRef} className={"lg:w-[25%] w-full h-full "}>
        <SideNav>
          {activeTab === 'discover' && <DiscoverTab matches={matches} chats={chats} setChats={setChats} setActiveTab={setActiveTab} />}
          {activeTab === 'messages' && <MessagesTab selectedChat={selectedChat} chats={chats} setSelectedChat={setSelectedChat} handleSendMessage={handleSendMessage} />}
          {activeTab === 'profile' && <ProfileTab  handleLogout={handleLogout}/>}
        </SideNav>

      </div>}

      {activeTab === 'recs' && <RecsTab />}

      <div className={" lg:hidden"}>


      </div>



      {!isCompactMode && <div className="lg:hidden">
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>}

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