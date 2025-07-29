import {Shield, Zap} from "lucide-react"

import SwipeCard from "../Elements/app/SwipeCard";
import SwipeActions from "../Cards/SwipeActions.tsx";
import SimpleTopNav from "../Layout/SimpleTopNav.tsx"
import {getSwipeUsers} from "../../server/handleSwipe.ts";

import useStore from "../../../store/store.ts"
import React, {useEffect, useRef, useState} from "react";
import {mockUsers} from "../../data/mockData.ts";


import handleSwipe from "../../logic/handleSwipe.ts";
import {useSwipe} from "../../hooks/useSwipe.ts";

import {ANIMATION_INTERVAL} from "../../logic/constants.ts"


export default function DiscoverTab () {


    const swipeCardRef = useRef<HTMLDivElement>(null);


    const currentUserIndex = useStore((state) => state.currentUserIndex);
    const setCurrentUserIndex = useStore((state) => state.setCurrentUserIndex);


    const currentUser = mockUsers[currentUserIndex];

    const nextUser = () => {

        setCurrentUserIndex((currentUserIndex + 1) % mockUsers.length);
    }

    const handleButtons = (button : "undo" | "pass" |"superlike" |"like" |"boost") => {

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

        if(!swipeCardRef.current) return;


        handleSwipe(dir, swipeCardRef.current);

        setTimeout(() => {
            nextUser();

        }, ANIMATION_INTERVAL)
    }

    useEffect(() => {

        console.log("SC: ", swipeCardRef.current);
    }, [swipeCardRef.current]);

    console.log("Reloading, ", currentUserIndex);

    const [compactMode, setCompactMode] = useState<boolean>(false);

    return (
        <div className="flex-1 flex flex-col">

            { !compactMode &&
                (
                    <SimpleTopNav>
                        <div className={"absolute right-0 mt-2"}>

                            <div className={"mr-4 p-1 bg-gray-800 bg-opacity-50 rounded-full hover:scale-110"}>
                                <Zap className={"w-full h-full text-purple-900 fill-purple-900 "}></Zap>

                            </div>
                        </div>
                    </SimpleTopNav>
                )

            }

            <div className="flex-1 relative lg:max-w-lg max-w-full w-full lg:mx-auto lg:p-4 ">
                {compactMode && (
                    <div className={"w-full h-16 p-4  bg-primary flex items-center text-white gap-2"}>

                        <p className={"text-2xl font-bold"}>{currentUser.name}</p>
                        <p className={"text-2xl"}>{currentUser.age}</p>
                        {currentUser.verified && (
                            <div title={"Photo Verified"}>
                                <Shield  className="h-5 w-5 text-blue-400 fill-current" />

                            </div>
                        )}


                    </div>
                )}
                <div className="relative w-full h-[75vh] min-h-[100px]">


                            { compactMode ?
                                <SwipeCard
                                    ref={swipeCardRef}
                                    key={`card`}
                                    user={currentUser}
                                    index={0}
                                    style={{
                                        zIndex: 0,
                                    }}
                                    compactMode={compactMode}
                                    setCompactMode={setCompactMode}
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
                                    compactMode={compactMode}
                                    setCompactMode={setCompactMode}
                                />
                            )
                            }
                            )}



                </div>
                <div className={"absolute w-full mx-auto bg-black lg:bg-transparent h-32 bottom-8"}>
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