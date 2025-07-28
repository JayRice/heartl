import {Zap} from "lucide-react"

import SwipeCard from "../Elements/app/SwipeCard";
import SwipeActions from "../Cards/SwipeActions.tsx";
import SimpleTopNav from "../Layout/SimpleTopNav.tsx"
import {getSwipeUsers} from "../../server/handleSwipe.ts";
import {useState} from "react";


interface Props {
    currentUserIndex: number;
    handleSwipe: (action : 'left' | 'right' | 'up') => void;
}
export default function DiscoverTab ({currentUserIndex, handleSwipe}: Props) {



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

                            {getSwipeUsers(currentUserIndex).map((user, index) => (
                                <SwipeCard
                                    key={user.id}
                                    user={user}
                                    onSwipe={handleSwipe}
                                    index={index}
                                    style={{
                                        zIndex: 3 - index,
                                    }}
                                />
                            ))}



                </div>
                <div className={"absolute w-full mx-auto bg-black h-32 bottom-8"}>
                    <SwipeActions
                        onUndo={() => console.log('Undo')}
                        onPass={() => handleSwipe('left')}
                        onSuperLike={() => handleSwipe('up')}
                        onLike={() => handleSwipe('right')}
                        onBoost={() => console.log('Boost')}
                    />
                </div>


            </div>
        </div>
    )
}