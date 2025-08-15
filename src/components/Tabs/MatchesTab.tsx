
import {Chat, Conversation, Message, User} from '../../types';

import {X} from "lucide-react";
import {useEffect, useState} from "react";
import Logo from "../Elements/Logo.tsx";
import useDatabaseStore from "../../../store/databaseStore.ts";
import LoadingSpinner from "../Elements/LoadingSpinner.tsx";
import SwipeCard from "../Elements/app/SwipeCard.tsx";
import Button from "../Elements/Button.tsx";
import handleMessage from "../../server/handleMessage.ts";


import {useMessagesStore} from "../../../store/messagesStore.ts";
import {useUIStore} from "../../../store/uiStore.ts";

import getMessages from "../../database/getMessages.ts";
import {listenForMessages} from "../../logic/listenForMessages.ts";

import ConversationModal from "../Elements/app/ConversationModal.tsx";

// at top-level imports
import { useMemo, useRef } from "react";

export default function MatchesTab() {
    const user = useDatabaseStore((s) => s.user);
    const matches = useDatabaseStore((s) => s.matches);
    const conversations = useDatabaseStore((s) => s.conversations);

    const messagesByConversation = useMessagesStore((s) => s.messagesByConversation);
    const addMessage = useMessagesStore((s) => s.addMessage);
    const setConversationMessages = useMessagesStore((s) => s.setMessages); // rename in your store if possible

    const pageFlowMode = useUIStore((state) => state.pageFlowMode)


    const [selectedMatch, setSelectedMatch] = useState<User | null>(null);

    const [selectedTab, setSelectedTab] = useState<"messages" | "matches">("matches");

    const tabSlideBar = useRef<HTMLDivElement>(null)



    const messagesTabRef = useRef<HTMLDivElement>(null)
    const matchesTabRef = useRef<HTMLDivElement>(null)


    const slideTabBar = (e) => {
        const clickedEl = e.currentTarget as HTMLElement;
        if (tabSlideBar.current) {
            const { offsetLeft, offsetWidth } = clickedEl;
            tabSlideBar.current.style.transform = `translateX(${offsetLeft}px)`;
            tabSlideBar.current.style.width = `${offsetWidth}px`;
        }
    }


    function moveSliderTo(el: HTMLElement) {
        if (!tabSlideBar.current || !tabSlideBar.current) return;
        // offsetLeft is relative to offsetParent; make slider a child of the same parent
        tabSlideBar.current.style.transform = `translateX(${el.offsetLeft}px)`;
        tabSlideBar.current.style.width = `${el.offsetWidth}px`;
    }

    useEffect(() => {
        const handle = () => {
            const target =
                selectedTab === "messages" ? messagesTabRef.current : matchesTabRef.current;
            if (target) requestAnimationFrame(() => moveSliderTo(target));
        };

    }, [selectedTab]);


    if (matches.length === 0) {
        return (
            <div className="flex justify-center items-center w-full h-full">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col w-full text-white font-bold p-2">

            <div className={`absolute top-0 ${pageFlowMode == "mobile" && "w-[100lvw]"} ${pageFlowMode == "desktop" && "w-[75lvw]  left-[25vw]"}`}>
                {selectedMatch && (
                    <ConversationModal
                        selectedMatch={selectedMatch}
                        conversations={conversations}
                        onClose={() => setSelectedMatch(null)}
                    />
                )}

            </div>

            <div className="lg:hidden mb-8">
                <div className="w-full h-full p-2 flex">
                    <Logo classNameParent="relative" classNameHeart="text-red-600" />
                </div>
            </div>

            { pageFlowMode == "desktop" && <div className={"relative flex flex-row  gap-2 w-full  justify-center select-none mb-8 "}>

                <button onLoadStart={(e) => {
                    slideTabBar(e)
                }} onClick={(e) => {
                    setSelectedTab("matches")
                    slideTabBar(e)
                }} className={"flex w-full  justify-center hover:text-red-600"}>
                    <span>Matches</span>
                </button>
                <button onClick={(e) => {
                    setSelectedTab("messages")
                    slideTabBar(e)
                }} className={"flex w-full justify-center hover:text-red-600"}>
                    <span>Messages</span>
                </button>

                <div ref={tabSlideBar}
                     className={"absolute  h-[2px] bg-red-600 left-0 bottom-[-.25rem] transition-transform"}></div>
            </div>}
            <div className={` ${pageFlowMode == "desktop" && "grid xl:grid-cols-3 grid-cols-2 gap-4 m-8"}  
                              ${pageFlowMode == "mobile" && `flex flex-row gap-2 overflow-x-auto overflow-y-hidden hidden-scroll w-full h-full ${pageFlowMode == "mobile" && "m-4"} `}`}>
                { (selectedTab == "matches" || pageFlowMode == "mobile") && matches.map((match) => (
                    <div
                        ref={matchesTabRef}
                        key={match.id}
                        onClick={() =>
                            setSelectedMatch(match)
                        }
                        className={`${selectedMatch && match.id !== selectedMatch.id ? "opacity-50" : ""}  relative ${pageFlowMode == "mobile" && "p-4"}  h-full cursor-pointer hover:scale-110 transition`}
                    >
                        <div className="small-inset-fade-bottom bottom-0 w-full  " />
                        {match?.data?.imageUrls?.[0] &&
                            <img src={match.data.imageUrls[0]} className="w-auto h-auto rounded-md " />}
                        <div className="absolute bottom-0 m-1">
                            <p>{match.profile.name}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className={"space-y-6 select-none"}>
                { (selectedTab == "messages" || pageFlowMode == "mobile") && conversations.map((conversation: Conversation) => {
                    const otherUserId = conversation.participantIds.find((participant) => participant != user?.id);
                    if (!otherUserId) {return}
                    const match = matches.find((match) => match.id === otherUserId);
                    if (!match?.data?.imageUrls?.length) return;
                    return (
                        <div onClick={() => {
                            setSelectedMatch(match);
                        }} className={"w-full h-full  bg-black rounded-lg flex items-center gap-4 p-2 cursor-pointer"}>
                            <div className={"w-14 h-14 rounded-full overflow-hidden"}>
                                <img src={match.data.imageUrls[0]} className="w-auto h-auto" />
                            </div>
                            <h1 className={"w-32 truncate"}>{match.profile.name}</h1>
                            {conversation.lastMessage && (
                                <p className={"w-32 truncate overflow-x-ellipse"}>{conversation.lastMessage}</p>
                            )}
                        </div>
                    )
                }) }
            </div>

        </div>
    );
}
