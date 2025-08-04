import {ChevronDown, Shield, Zap} from "lucide-react"

import SwipeCard from "../Elements/app/SwipeCard";
import SwipeActions from "../Cards/SwipeActions.tsx";
import SimpleTopNav from "../Layout/SimpleTopNav.tsx"
import {getSwipeUsers} from "../../server/handleSwipe.ts";

import useStore from "../../../store/store.ts"
import React, {useEffect, useRef} from "react";
import {mockUsers} from "../../data/mockData.ts";


import handleSwipe from "../../logic/handleSwipe.ts";

import {ANIMATION_INTERVAL, PAUSE_SWIPE_BUTTON_INTERVAL} from "../../logic/constants.ts"



export default function RecsTab () {


    const swipeCardRef = useRef<HTMLDivElement>(null);

    const animationTimeout = useRef< NodeJS.Timeout | null>(null);

    const currentUserIndex = useStore((state) => state.currentUserIndex);
    const setCurrentUserIndex = useStore((state) => state.setCurrentUserIndex);

    const setThresholdRatio = useStore((state) => state.setThresholdRatio);
    const thresholdRatio = useStore((state) => state.thresholdRatio);


    const isCompactMode = useStore((state) => state.isCompactMode);
    const setIsCompactMode = useStore((state) => state.setIsCompactMode);




    const currentUser = mockUsers[currentUserIndex];

    const nextUser = () => {

        setCurrentUserIndex((currentUserIndex + 1) % mockUsers.length);
    }

    const handleButtons = (button : "undo" | "pass" |"superlike" |"like" |"boost") => {

        setIsCompactMode(false)
        switch (button) {
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

            handleSwipe(dir, swipeCardRef.current);

            setTimeout(() => {
                nextUser();

            }, ANIMATION_INTERVAL)
        }, PAUSE_SWIPE_BUTTON_INTERVAL)

    }

    useEffect(() => {

    }, [swipeCardRef.current]);



    return (
        <div id={"discover-tab"} className="flex-1 flex flex-col z-0">

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
                    <div className={`relative w-full h-16 p-4  bg-primary flex items-center text-white gap-2`}>

                        <p className={"text-2xl font-bold"}>{currentUser.name}</p>
                        <p className={"text-2xl"}>{currentUser.age}</p>
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
                <div className="relative w-full h-[75vh] min-h-[100px]">


                            { isCompactMode ?
                                <SwipeCard
                                    ref={swipeCardRef}
                                    key={`card`}
                                    user={currentUser}
                                    index={0}
                                    style={{
                                        zIndex: 0,
                                    }}
                                />
                                :getSwipeUsers(currentUserIndex).map((user, index) => {

                                return (
                                 <SwipeCard
                                    ref={(index==0) ? swipeCardRef : undefined}
                                    key={`${user.id}-${index}`}
                                    user={user}
                                    index={index}
                                    style={{
                                        zIndex: 3 - index,
                                    }}

                                />
                            )
                            }
                            )}



                </div>

                {isCompactMode && <div className={`relative w-full h-[100vh] bg-black`}>

                </div>}



                <div className={` w-full  mx-auto   bg-transparent ${isCompactMode? " fixed bg-transparent lg:absolute ":" absolute lg:relative  bottom-8"} lg:bg-transparent lg:h-full h-32 lg:bottom-0`}>
                    <SwipeActions
                        onUndo={() => handleButtons('undo')}
                        onPass={() => handleButtons('pass')}
                        onSuperLike={() => handleButtons('superlike')}
                        onLike={() => handleButtons('like')}
                        onBoost={() => handleButtons('boost')}
                    />
                </div>




            </div>
        </div>
    )
}