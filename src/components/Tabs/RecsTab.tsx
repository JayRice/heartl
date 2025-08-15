import {ChevronDown, Shield, Zap} from "lucide-react"
import  { useRef, useState} from "react";
import {Toaster} from "react-hot-toast"



import SwipeCard from "../Elements/app/SwipeCard";
import SwipeActions from "../Cards/SwipeActions.tsx";
import animateSwipe from "../../logic/animateSwipe.ts";
import LoadingSpinner from "../Elements/LoadingSpinner.tsx";

import {SwipeAction} from "../../types";


import useStore from "../../../store/store.ts"
import useDatabaseStore from "../../../store/databaseStore.ts";
import useUIStore from "../../../store/UIStore.ts";

import {PAUSE_SWIPE_BUTTON_INTERVAL} from "../../logic/constants.ts"

import nextUser from "../../logic/nextUser.ts";
import Logo from "../Elements/Logo.tsx";

export default function RecsTab () {



    const animationTimeout = useRef< NodeJS.Timeout | null>(null);


    const [buttonsDisabled, setButtonsDisabled] = useState(false);

    const pageFlowMode = useUIStore((state) => state.pageFlowMode);



    const setThresholdRatio = useStore((state) => state.setThresholdRatio);
    const thresholdRatio = useStore((state) => state.thresholdRatio);

    const user = useDatabaseStore((state) => state.user);

    const swipeBuffer = useStore((state) => state.swipeBuffer);
    const setSwipeBuffer = useStore((state) => state.setSwipeBuffer);

    const setLastMatch = useStore((state) => state.setLastMatch);


    const [isCompactMode, setIsCompactMode] = useState<boolean>(false)


    const imageUrls = useStore((state) => state.imageUrls)

    const isLoadingMatches = useStore((state) => state.isLoadingMatches);

    const currentMatch = swipeBuffer ? swipeBuffer[0] : null;

    const cardRefs = useRef<Record<string, React.RefObject<HTMLDivElement>>>({});

    const registerCardRef = (id: string, ref: React.RefObject<HTMLDivElement>) => {
        cardRefs.current[id] = ref;
    };



    const handleSwipe = async (element: HTMLDivElement | null, dir: "left" | "right" | "up", cardId: string) => {





        console.log("swiping: ", dir)
        if(!swipeBuffer || !element) {return}


        setButtonsDisabled(true);
        await animateSwipe(dir, element); // your CSS/JS anim
        setButtonsDisabled(false);


        // Remove the top card immediately after animation so the next card is ready
        delete cardRefs.current[cardId]
        const prev = useStore.getState().swipeBuffer ?? [];
        setSwipeBuffer(prev.filter(u => u.id !== cardId));


        // // Refill in the background; UI already shows the next card
        nextUser(dir == "left" ? "pass": dir=="right" ? "like":"superlike", cardId).then((newUser) => {
            const swipeBuffer = useStore.getState().swipeBuffer;
            if(!swipeBuffer) {return}
            console.log("old: ", swipeBuffer, " New: ", [...swipeBuffer, ...newUser]);
            if (newUser) setSwipeBuffer([...swipeBuffer, ...newUser]);
        });
    };


    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const handleButtons = async (action : SwipeAction) => {

        if(!user  || !swipeBuffer || !currentMatch || buttonsDisabled) return;

        setIsCompactMode(false)

        // When swiped, add one new match to the end of the swipeBuffer, if the swipeBuffer reaches 0 because no new matches then
        // the useEffect in SwipeApp will take care of this case.


        await handleSwipeButtons(action)

        const cardId = swipeBuffer[0]?.id;
        delete cardRefs.current[cardId]
        const prev = useStore.getState().swipeBuffer ?? [];
        setSwipeBuffer(prev.filter(u => u.id !== cardId));

        nextUser(action, cardId).then((newUser) => {
            const swipeBuffer = useStore.getState().swipeBuffer;
            if(!swipeBuffer) {return}
            if (newUser) setSwipeBuffer([...swipeBuffer, ...newUser]);
        });

    }
    async function handleSwipeButtons(action: SwipeAction) {
        if (!user || !cardRefs.current) return;

        // Set swipe direction thresholds
        if (action === "pass") {
            setThresholdRatio([-1, thresholdRatio[1]]);
        } else if (action === "like") {
            setThresholdRatio([1, thresholdRatio[1]]);
        } else {
            setThresholdRatio([thresholdRatio[0], -1]);
        }

        // Return if already swiping
        if (animationTimeout.current) {
           return;
        }

        setButtonsDisabled(true);


        // Wait for the pause interval before continuing
        await new Promise<void>((resolve) => {
            animationTimeout.current = setTimeout(() => {
                animationTimeout.current = null;
                resolve();
            }, PAUSE_SWIPE_BUTTON_INTERVAL);
        });




        // At this point the timeout has finished, now you can exit early if needed
        const swipeBuffer = useStore.getState().swipeBuffer;
        if (!swipeBuffer) return;

        const cardId = swipeBuffer[0].id;
        const currentCardRef = cardRefs.current[cardId];

        if (!currentCardRef?.current) return;

        setThresholdRatio([0, 0]);
        const dir = action == "like" ? "right": action == "pass"? "left":"up";

        await animateSwipe(dir, currentCardRef.current);

        setButtonsDisabled(false);
    }

    const doMatchesExist = swipeBuffer && swipeBuffer.length > 0;

    const LoadingMatchesScreen =  () => {

        return (
            <div className={"relative w-full h-full  flex justify-center items-center"}>
                {isLoadingMatches && [0, 1, 2].map((delay, index) => (
                    <span
                        key={index}
                        className={`absolute z-50 w-16 h-16 rounded-full bg-red-600 opacity-75 animate-pulse-expand`}
                        style={{ animationDelay: `${delay}s`, animationDuration: "3s" }}
                    />
                ))}
                <div className={`rounded-full w-20 h-20 overflow-hidden pulse-animation`}>
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
                    <div className={"lg:hidden h-16 flex items-center "}>
                            <div className={"m-2"}>
                                <Logo classNameParent={"text-white w-full h-full"} classNameHeart={"text-red-600"}></Logo>
                            </div>
                            <div className={"absolute right-0"}>


                                <div className={"mr-4 p-1 bg-gray-800 bg-opacity-50 rounded-full hover:scale-110"}>
                                    <Zap className={"w-6 h-6 text-purple-900 fill-purple-900 "}></Zap>

                                </div>
                            </div>
                    </div>

                )

            }

            <div className={`flex-1 relative ${pageFlowMode == "desktop" ? "max-w-[450px] mx-auto mt-4" : "max-w-full"} w-full `}>


                {(isCompactMode) && (
                    <div className={`relative w-full h-20 p-4  bg-primary flex items-center text-white gap-2`}>

                        <p className={"text-2xl font-bold"}>{currentMatch?.profile.name}</p>
                        <p className={"text-2xl"}>{currentMatch?.profile.birthday}</p>
                        {currentMatch?.profile.verified && (
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
                <div className={`relative w-full h-[85vh] min-h-[100px]`}>
                    <div className={"relative w-full h-full"}>
                        {
                            doMatchesExist ? (
                                swipeBuffer
                                    .slice(0, isCompactMode ? 1 : swipeBuffer.length)
                                    .map((user, index) => (
                                        <SwipeCard
                                            key={`${user.id}`}
                                            user={user}
                                            isCompactMode={isCompactMode}
                                            setIsCompactMode={setIsCompactMode}
                                            index={index}
                                            style={{ zIndex: 3 - index }}
                                            onSwipe={handleSwipe}
                                            registerCardRef={registerCardRef}
                                        />
                                    ))
                            ) : (
                                <LoadingMatchesScreen></LoadingMatchesScreen>

                            )
                        }
                    </div>


                    <div className={` lg:relative lg:bottom-0 bottom-20 absolute w-full  `}>
                        <SwipeActions
                            disabled={buttonsDisabled}
                            onUndo={() => handleButtons('undo')}
                            onPass={() => handleButtons('pass')}
                            onSuperLike={() => handleButtons('superlike')}
                            onLike={() => handleButtons('like')}
                            onBoost={() => handleButtons('boost')}
                        />
                    </div>


                </div>










            </div>
        </div>
    )
}