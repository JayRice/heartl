import {ChevronDown, Shield, Zap} from "lucide-react"
import  {useEffect, useRef, useState} from "react";
import {toast, Toaster} from "react-hot-toast"



import SwipeCard from "../Elements/app/SwipeCard";
import SwipeActions from "../Cards/SwipeActions.tsx";
import SimpleTopNav from "../Layout/SimpleTopNav.tsx"
import {handleSwipeAction} from "../../server/handleSwipeAction.ts";
import animateSwipe from "../../logic/animateSwipe.ts";
import LoadingSpinner from "../Elements/LoadingSpinner.tsx";

import {User, SwipeAction} from "../../types";


import useStore from "../../../store/store.ts"
import useDatabaseStore from "../../../store/databaseStore.ts";

import {ANIMATION_INTERVAL, PAUSE_SWIPE_BUTTON_INTERVAL} from "../../logic/constants.ts"

import nextUser from "../../logic/nextUser.ts";

export default function RecsTab () {




    const swipeCardRef = useRef<HTMLDivElement>(null);

    const animationTimeout = useRef< NodeJS.Timeout | null>(null);



    const setThresholdRatio = useStore((state) => state.setThresholdRatio);
    const thresholdRatio = useStore((state) => state.thresholdRatio);

    const user = useDatabaseStore((state) => state.user);

    const swipeBuffer = useDatabaseStore((state) => state.swipeBuffer);
    const setSwipeBuffer = useDatabaseStore((state) => state.setSwipeBuffer);

    const isCompactMode = useStore((state) => state.isCompactMode);
    const setIsCompactMode = useStore((state) => state.setIsCompactMode);


    const imageUrls = useStore((state) => state.imageUrls)

    const isLoadingMatches = useStore((state) => state.isLoadingMatches);

    const currentMatch = swipeBuffer ? swipeBuffer[0] : null;


    const handleButtons = async (action : SwipeAction) => {

        if(!user  || !swipeBuffer || !currentMatch) return;

        setIsCompactMode(false)

        handleSwipeAction(action, user, currentMatch).then((response) => {
            if (response.error){
                return toast.error(`Error while ${action}\`ing: ${response.error.message}. Try again later...`);
            }
            if (response.success){

            }

        })

        console.log(action)
        // When swiped, add one new match to the end of the swipeBuffer, if the swipeBuffer reaches 0 because no new matches then
        // the useEffect in SwipeApp will take care of this case.
        nextUser()




        switch (action) {
            case "undo":
                break;
            case "pass":
                handleSwipeButtons("left");break;
            case "superlike":
                handleSwipeButtons("up");break;
            case "like":
                handleSwipeButtons("right");break;
            case "boost":
                break;
        }
    }
    const handleSwipeButtons = (dir: "left" | "right" | "up") =>{


        if(animationTimeout.current){
            clearTimeout(animationTimeout.current)
        }

        if (dir === "left") {
            setThresholdRatio([-1, thresholdRatio[1]])

        }else if (dir === "right") {
            setThresholdRatio([1, thresholdRatio[1]])
        }else {
            setThresholdRatio([thresholdRatio[0], -1])
        }

        animationTimeout.current = setTimeout(() => {
            animationTimeout.current = null;
            setThresholdRatio([0,0])
            if(!swipeCardRef.current) return;

            animateSwipe(dir, swipeCardRef.current);

            setTimeout(() => {
                nextUser();
            }, ANIMATION_INTERVAL)
        }, PAUSE_SWIPE_BUTTON_INTERVAL)

    }


    const doMatchesExist = swipeBuffer && swipeBuffer.length > 0;

    const LoadingMatchesScreen =  () => {

        return (
            <div className={"relative w-full h-full  flex justify-center items-center"}>
                {[0, 1, 2].map((delay, index) => (
                    <span
                        key={index}
                        className={`absolute w-16 h-16 rounded-full bg-red-600 opacity-75 ${isLoadingMatches && "animate-pulse-expand"}`}
                        style={{ animationDelay: `${delay}s`, animationDuration: "3s" }}
                    />
                ))}
                <div className={" pulse-animation rounded-full w-20 h-20 overflow-hidden"}>
                    { imageUrls ?
                        <div>
                            <img className={"w-full h-full"} src={imageUrls[0] }></img>
                        </div>:
                        <LoadingSpinner />
                    }
                </div>
            </div>
        )

    }




    return (
        <div id={"discover-tab"} className="flex-1 flex flex-col z-0">
            <Toaster position={"top-center"}></Toaster>


            { !isCompactMode &&
                (
                    <div className={"lg:hidden"}>
                        <SimpleTopNav>
                            <div className={"absolute right-0 mt-2"}>

                                <div className={"mr-4 p-1 bg-gray-800 bg-opacity-50 rounded-full hover:scale-110"}>
                                    <Zap className={"w-full h-full text-purple-900 fill-purple-900 "}></Zap>

                                </div>
                            </div>
                        </SimpleTopNav>
                    </div>

                )

            }

            <div className="flex-1 relative lg:max-w-lg max-w-full w-full lg:mx-auto lg:p-4is ${}   ">


                {isCompactMode && (
                    <div className={`relative w-full h-20 p-4  bg-primary flex items-center text-white gap-2`}>

                        <p className={"text-2xl font-bold"}>{currentUser.profile.name}</p>
                        <p className={"text-2xl"}>{currentUser.profile.birthday}</p>
                        {currentUser.verified && (
                            <div title={"Photo Verified"}>
                                <Shield  className="h-5 w-5 text-blue-400 fill-current" />

                            </div>
                        )}
                        <div  onPointerDown={(e) => {

                            e.stopPropagation();
                            e.preventDefault();

                            setIsCompactMode(!isCompactMode);
                        }} onPointerUp={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                        }} className={"absolute border-[1px] cursor-pointer  border-white m-8  pointer-events-auto rounded-full p-1 bg-black bg-opacity-60 hover:scale-110 transition-opacity right-0  "}>


                            <ChevronDown className={"w-6 h-6 text-white"}></ChevronDown>
                        </div>


                    </div>
                )}
                <div className="relative w-full h-[90vh] min-h-[100px]  ">

                    {
                        doMatchesExist ? (
                            swipeBuffer
                                .slice(0, isCompactMode ? 1 : swipeBuffer.length)
                                .map((user, index) => (
                                    <SwipeCard
                                        ref={index === 0 ? swipeCardRef : undefined}
                                        key={`${user.id}-${index}`}
                                        user={user}
                                        index={index}
                                        style={{ zIndex: 3 - index }}
                                    />
                                ))
                        ) : (
                            <LoadingMatchesScreen></LoadingMatchesScreen>

                        )
                    }

                    <div className={` lg:relative lg:bottom-0 bottom-20 absolute  w-full  `}>
                        <SwipeActions
                            onUndo={() => handleButtons('undo')}
                            onPass={() => handleButtons('pass')}
                            onSuperLike={() => handleButtons('superlike')}
                            onLike={() => handleButtons('like')}
                            onBoost={() => handleButtons('boost')}
                        />
                    </div>


                </div>

                {isCompactMode && <div className={`relative w-full h-[100vh] bg-black`}>

                </div>}








            </div>
        </div>
    )
}