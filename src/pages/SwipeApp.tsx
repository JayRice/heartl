import React, {useState, useRef, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import BottomNav from '../../src/components/Elements/app/BottomNav.tsx';


import MatchNotification from '../components/Notifications/MatchNotification';
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
import {SEARCH_FOR_SWIPES_INTERVAL, SEARCH_FOR_SWIPES_TIMES} from "../logic/constants.ts";
import nextUser from "../logic/nextUser.ts";
import useUIStore from "../../store/UIStore.ts";

import {db, storage} from "../config/firebase.ts";
import getMatches from "../database/getMatches.ts";
import {getDownloadURL, ref} from "firebase/storage";
import getConversations from "../database/getConversations.ts";





const SwipeApp: React.FC = () => {


  const [activeTab, setActiveTab] = useState<'recs' | 'matches' | 'discover' | 'messages' | 'profile'>('matches');



  const matches=  useDatabaseStore((state) => state.matches);
  const setMatches=  useDatabaseStore((state) => state.setMatches);

  const conversations = useDatabaseStore((state) => state.conversations);
  const setConversations = useDatabaseStore((state) => state.setConversations);

  const [showMatchNotification, setShowMatchNotification] = useState<User | null>(null);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  const navigate = useNavigate();

  const pageFlowMode = useUIStore((state) => state.pageFlowMode);
  const setPageFlowMode = useUIStore((state) => state.setPageFlowMode);

  const swipeBuffer = useStore((state) => state.swipeBuffer);
  const setSwipeBuffer = useStore((state) => state.setSwipeBuffer);

  const user = useDatabaseStore((state) => state.user);

  const prevMatchIds = useRef<string[]>([]);





  // Handle swipe when first loading the Swipe app /app


  const hasRunRef = useRef(false);

  function arraysEqual(a: string[], b: string[]) {
    if (a.length !== b.length) return false;
    return a.every((val, idx) => val === b[idx]);
  }
  useEffect(() => {

    if (!user) {return}

    getConversations().then((conversations) => {
      console.log("Conversations: ", conversations);
      setConversations(conversations);
    })

    // Check if matches already cached and nothing has changed
    if ( user.activity?.matchIds) {
      const matchIds = user.activity.matchIds;
      const cachedIds = matches.map((u) => u.id);



      if (arraysEqual(matchIds, cachedIds)) {
        console.log("Matches found are already cached")
        return;
      }

      // Get matches
      getMatches(matchIds).then(async (matchedUsers : User[]) => {
        if (!matchedUsers) {return}
        let newMatchedUsers = await Promise.all(matchedUsers.map(async (user) => {
          const imageIds = user.profile.imageIds;

          if (!imageIds){return null}

          const urls = await Promise.all(
              imageIds.map((id) => {
                const imageRef = ref(storage, `user-images/${user.id}/${id}`);
                return getDownloadURL(imageRef); // return, don't push
              })
          );

          user.data = {
            imageUrls: urls,
          }
          return user;
        }))
        newMatchedUsers = newMatchedUsers.filter((user) => user !== null)

        setMatches(newMatchedUsers as User[]);
      });
    }







  }, [user]);
  useEffect(() => {
    if (hasRunRef.current) return; // skip second run in dev
    hasRunRef.current = true;
    if (!user) {toast.error("Not Logged in."); return}


    // When first swiping, fill swipe buffer
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
    // await logout();
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
    <div className=" min-h-screen h-screen bg-primary flex flex-row overflow-x-hidden overflow-y-hidden">
      <Toaster position={"top-center"}></Toaster>

      <div ref={sideNavRef} className={`h-full ${pageFlowMode == "desktop" ? "w-[25vw]":"w-full"} 
      ${pageFlowMode == "mobile" && activeTab == "recs" && "hidden"} `}>
        <SideNav>
          {activeTab === 'discover' && <ExploreTab  />}
          { (activeTab === 'messages' || activeTab === "matches") && <MatchesTab  />}
          {activeTab === 'profile' && <ProfileTab  handleLogout={handleLogout}/>}
        </SideNav>

      </div>

      {(pageFlowMode == "desktop" || activeTab == "recs") && <RecsTab />}

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