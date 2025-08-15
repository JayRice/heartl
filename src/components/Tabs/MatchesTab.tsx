
import {Chat, Message, User} from '../../types';

import {X} from "lucide-react";
import {useEffect, useState} from "react";
import Logo from "../Elements/Logo.tsx";
import useDatabaseStore from "../../../store/databaseStore.ts";
import LoadingSpinner from "../Elements/LoadingSpinner.tsx";
import SwipeCard from "../Elements/app/SwipeCard.tsx";
import Button from "../Elements/Button.tsx";
import handleMessage from "../../server/handleMessage.ts";


import {useMessagesStore} from "../../../store/messagesStore.ts";
import getMessages from "../../database/getMessages.ts";
import {listenForMessages} from "../../logic/listenForMessages.ts";






export default function MatchesTab() {


    const user = useDatabaseStore((state) => state.user);
    const matches = useDatabaseStore((state) => state.matches);

    const [selectedMatch, setSelectedMatch] = useState<User | null>(null);


    const conversations = useDatabaseStore((state) => state.conversations);

    const messagesByConversation = useMessagesStore((state) => state.messagesByConversation)
    const addMessage = useMessagesStore((state) => state.addMessage)
    const setMessages = useMessagesStore((state) => state.setMessages)


    useEffect(() => {
        if (!selectedMatch){return}

        const conversation = conversations.find((conversation) => conversation.participantIds.includes(selectedMatch.id));
        if (!conversation){return}

        getMessages(conversation.id).then((messages) => {
            setMessages(conversation.id, messages);
        })

    }, [selectedMatch]);

    const ConversationModal = () => {
        const [message, setMessage] = useState("");
        const [messages, setMessages] = useState<Message[]>([]);



        const handleSendMessage = () => {
            if(!selectedMatch || !user) {return}
            const newMessage = {
                receiverId: selectedMatch.id,
                senderId: user.id,
                content: message.trim(),
            } as Message;
            handleMessage(newMessage)
            setMessage("")
        }

        useEffect(() => {

            if (!selectedMatch || !selectedMatch.data?.imageUrls || selectedMatch.data.imageUrls.length === 0 ) {return}

            const conversation = conversations.find((conversation) => conversation.participantIds.includes(selectedMatch.id));

            if (!conversation || !user) {return}

            setMessages(messagesByConversation[conversation.id]);

            console.log("listen")
            const unsub = listenForMessages(conversation.id);
            return () => unsub();
        }, [selectedMatch]);

        if(!messages || !user || !selectedMatch ){
            return;
        }

        return (
            <div onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && !(e.nativeEvent).isComposing) {
                    e.preventDefault();
                    handleSendMessage();

                }
            }}
                className={"absolute flex flex-row w-[75lvw] h-screen left-[25vw] top-0 bg-app_primary slide-in-right z-30 overflow-none"}>
                <div className={"relative w-2/3 h-full    "}>

                    <div className={"relative w-full h-20 flex items-center border-b-[1px] border-r-[1px] border-complementary gap-4"}>

                        <X onClick={() => {
                            setSelectedMatch(null)
                        }} className={"absolute  w-10 h-10 cursor-pointer hover:scale-110 transition-transform right-4 p-2"}></X>
                        <div className={"ml-2 rounded-full w-14 h-14  overflow-hidden"}>
                            <img src={selectedMatch.data.imageUrls[0]} className={"w-full h-full"}></img>
                        </div>

                        <h1 className={"font-light text-2xl"}> You matched with {selectedMatch.profile.name} on ... </h1>
                    </div>

                    <div className={"relative max-h-screen  overflow-y-auto hidden-scroll p-2 space-y-6 "}>
                        {messages.map((msg: Message) => (
                            <p key={msg.id}  className={`w-1/2 p-2 text-white rounded-md ${msg.senderId == user.id ? `bg-gray-800`:`bg-red-600 ml-auto`}`}>{msg.content}</p>
                        ))}
                    </div>
                    <div className={"absolute flex gap-2 justify-center bottom-0 w-full h-16 border-t-[1px] border-complementary p-2"}>

                        <input className={"w-1/2 text-lg bg-app_primary rounded-md"} value={message} onChange={(e) => {
                            setMessage(e.target.value);
                        }} placeholder={"Type a message"}></input>
                        <Button disabled={message === ""}

                            onClick={() => {
                                /*
                                      conversationId: string;
                                      senderId: string;
                                      content: string;
                                      createdAt: Date; // or Firebase Timestamp if you prefer
                                * */
                                handleSendMessage();


                            }
                        } className={"w-32 flex justify-center items-center"}>
                            <p className={"text-md "}>Send</p>
                        </Button>
                    </div>


                </div>
                <div className={"relative w-1/3 h-full border-l-[1px] border-complementary   "}>
                    <SwipeCard user={selectedMatch} isCompactMode={true}></SwipeCard>
                </div>
            </div>
        )
    }


    if (matches.length === 0) {
        return <div className={"flex justify-center items-center w-full h-full"}>
            <LoadingSpinner></LoadingSpinner>
        </div>
    }
    return (
        <div className="flex-1 flex flex-col w-full text-white font-bold p-2 ">
            {selectedMatch &&
            <ConversationModal/>}

            <div className={"lg:hidden mb-8"}>
                <div className={"w-full h-full  p-2 flex"}>
                    <Logo classNameParent={"relative"} classNameHeart={"text-red-600"}></Logo>
                </div>
            </div>

            <h1>New Matches</h1>
            <div className={"grid grid-cols-3 gap-4 m-2"}>
                {

                    matches.map((match, index) => (
                    <div key={match.id} onClick={() => {
                        setSelectedMatch(match)
                    }} className={`${selectedMatch && match.id != selectedMatch.id && "opacity-50"} relative w-full h-[125px] bg-black rounded-md overflow-hidden cursor-pointer hover:scale-110 transition`}>
                        <div className={"small-inset-fade-bottom bottom-0 w-full"}></div>
                        {(match?.data?.imageUrls && match.data.imageUrls.length > 0) &&
                            <img src={match.data.imageUrls[0]} className={"w-auto h-auto"}></img>}

                        <div className={"absolute bottom-0  m-1"}>
                            <p>{match.profile.name}</p>
                        </div>
                    </div>
                    ))
                }
            </div>


        </div>
    )
}