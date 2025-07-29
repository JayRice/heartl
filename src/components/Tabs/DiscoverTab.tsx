import {Zap} from "lucide-react"

import SwipeCard from "../Elements/app/SwipeCard";
import SwipeActions from "../Cards/SwipeActions.tsx";
import SimpleTopNav from "../Layout/SimpleTopNav.tsx"
import {getSwipeUsers} from "../../server/handleSwipe.ts";

import useStore from "../../../store/store.ts"
import  {useEffect, useRef} from "react";
import {mockUsers} from "../../data/mockData.ts";


import handleSwipe from "../../logic/handleSwipe.ts";
import {useSwipe} from "../../hooks/useSwipe.ts";

import {ANIMATION_INTERVAL} from "../../logic/constants.ts"


export default function DiscoverTab () {


    const swipeCardRef = useRef<HTMLDivElement>(null);


    const currentUserIndex = useStore((state) => state.currentUserIndex);
    const setCurrentUserIndex = useStore((state) => state.setCurrentUserIndex);

    const nextUser = () => {

        setCurrentUserIndex((currentUserIndex + 1) % mockUsers.length);
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

    return (
        <div className="flex-1 flex flex-col">
            <SimpleTopNav>
                <div className={"absolute right-0 mt-2"}>

                    <div className={"mr-4 p-1 bg-gray-800 bg-opacity-50 rounded-full hover:scale-110"}>
                        <Zap className={"w-full h-full text-purple-900 fill-purple-900 "}></Zap>

                    </div>
                </div>
            </SimpleTopNav>

            <div className="flex-1 relative lg:max-w-lg max-w-full w-full lg:mx-auto lg:p-4 ">
                <div className="relative w-full h-[75vh] min-h-[100px]">


                            {getSwipeUsers(useStore((state) => state.currentUserIndex)).map((user, index) => {

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
                <div className={"absolute w-full mx-auto bg-black h-32 bottom-8"}>
                    <SwipeActions
                        onUndo={() => console.log('Undo')}
                        onPass={() => handleSwipeButtons('left')}
                        onSuperLike={() => handleSwipeButtons('up')}
                        onLike={() => handleSwipeButtons('right')}
                        onBoost={() => console.log('Boost')}
                    />
                </div>


            </div>
        </div>
    )
}