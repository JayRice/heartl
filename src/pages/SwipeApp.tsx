import React, {useState, useRef, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import BottomNav from '../../src/components/Elements/app/BottomNav.tsx';


import MatchNotification from '../components/Notifications/MatchNotification';
import { mockUsers, mockMatches, mockChats } from '../data/mockData';
import { User, Match, Chat } from '../types';
import { useAuth } from '../hooks/useAuth';

import RecsTab from "../components/Tabs/RecsTab.tsx"
import ExploreTab from "../components/Tabs/ExploreTab.tsx"
import MatchesTab from "../components/Tabs/MatchesTab.tsx"
import ProfileTab from "../components/Tabs/ProfileTab.tsx"
import useStore from "../../store/store.ts";
import SideNav from "../components/Elements/app/SideNav";

import useDatabaseStore from "../../store/databaseStore.ts"
import {toast, Toaster} from "react-hot-toast";
import fillSwipeBuffer from "../server/fillSwipeBuffer.ts";





const SwipeApp: React.FC = () => {


  const [activeTab, setActiveTab] = useState<'recs' | 'matches' | 'discover' | 'messages' | 'profile'>('discover');

  const storedDataUser = useDatabaseStore((state) => state.user);

  const [matches, setMatches] = useState<Match[]>(mockMatches);
  const [chats, setChats] = useState<Chat[]>(mockChats);

  const [showMatchNotification, setShowMatchNotification] = useState<User | null>(null);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const isCompactMode = useStore((state) => state.isCompactMode);


  const [pageFlowMode, setPageFlowMode] = useState<"desktop" | "mobile">(window.innerWidth >= 1024 ? "desktop" : "mobile");


  const swipeBufferIndex = useDatabaseStore((state) => state.swipeBufferIndex);
  const setSwipeBufferIndex = useDatabaseStore((state) => state.setSwipeBufferIndex);

  const swipeBuffer = useDatabaseStore((state) => state.swipeBuffer);
  const setSwipeBuffer = useDatabaseStore((state) => state.setSwipeBuffer);

  const user = useDatabaseStore((state) => state.user);


  const prevMatchIds = useRef<string[]>([]);

  // Handle swipe when first loading the Swipe app /app
  useEffect(() => {

    if (!user) {toast.error("Not Logged in."); return}


    // When first swiping
    if (!swipeBuffer || swipeBuffer.length < 3){
      // fill the entire swipe buffer (length 3)
      fillSwipeBuffer("full", user ).then((response) => {
        if (response.error){
          // This means ran out of filter options, alert user
          if (response.code === "empty" && response.error){
            console.error(response.error);
            toast.error(response.error)
            return null;
          }
          toast.error("We couldn't retrieve swipe matches. Try again later.")
          return null;
        }
        if (response.success){
          setSwipeBuffer(response.matches)
        }
      })
    }
  }, []);

  // useEffect(() => {
  //   if (!storedDataUser){
  //     return;
  //   }
  //   const current = storedDataUser.relations.matchIds;
  //   const prev = prevMatchIds.current;
  //
  //   if (prev.length < current.length) {
  //     const newMatch = current.find(id => !prev.includes(id));
  //     if (newMatch) {
  //       // Notify use that they just matched
  //     }
  //   }
  //
  //   prevMatchIds.current = current;
  // }, [storedDataUser?.relations.matchIds]);

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

  useEffect(() => {
    const handleResize = () => {
      setPageFlowMode(window.innerWidth >= 1024 ? "desktop" : "mobile");
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  return (
    <div className=" min-h-screen h-screen bg-primary flex flex-row overflow-x-hidden">
      <Toaster position={"top-center"}></Toaster>

      <div ref={sideNavRef} className={`h-full ${pageFlowMode == "desktop" ? "w-[25%]":"w-full"} 
      ${pageFlowMode == "mobile" && activeTab == "recs" && "hidden"} `}>
        <SideNav>
          {activeTab === 'discover' && <ExploreTab  />}
          {activeTab === 'messages' && <MatchesTab  />}
          {activeTab === 'profile' && <ProfileTab  handleLogout={handleLogout}/>}
        </SideNav>

      </div>

      {activeTab === 'recs' && <RecsTab />}

      <div className={" lg:hidden"}>


      </div>



      { (pageFlowMode=="mobile") && <div className="">
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

export default SwipeApp;