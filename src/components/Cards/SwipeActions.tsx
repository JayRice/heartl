import React from 'react';
import { RotateCcw, X, Star, Heart, Zap } from 'lucide-react';

import SwipeButton from "./SwipeButton.tsx"
import useStore from "../../../store/store.ts";
import checkSwipe from "../../logic/checkSwipe.ts";
import {handleSwipeAction} from "../../server/handleSwipeAction.ts"


interface SwipeActionsProps {
  onUndo: () => void;
  onPass: () => void;
  onSuperLike: () => void;
  onLike: () => void;
  onBoost: () => void;
}

const SwipeActions: React.FC<SwipeActionsProps> = ({
  onUndo,
  onPass,
  onSuperLike,
  onLike,
  onBoost
}) => {

    const thresholdRatio = useStore((state) => state.thresholdRatio);

    const swipeBias = checkSwipe()

    const isThresholdZero = thresholdRatio[0] == 0 && thresholdRatio[1] == 0;

    const isCompactMode = useStore((state) => state.isCompactMode);

    return (
    <div className={"absolute w-full z-50 flex y h-full "}>


        <div className={`flex items-center ${isCompactMode ? "justify-center lg:gap-20 gap-8":"justify-evenly"} w-full`}>

            { !isCompactMode && <div
                style={{
                    transform: `${isThresholdZero ? "scaleX(100%)":"scaleX(0%)" }`
                }}
                className={"lg:hidden absolute w-full p-4 transition-transform"}>
                <div className={"w-full h-4  rounded-b-full bg-[#21252E] "}></div>
            </div>}

            { !isCompactMode && <SwipeButton
                onClick={onUndo}
                className="w-12 h-12 transition-transform duration-500 "
                style={{
                    transform: `${isThresholdZero ? "scale(100%)":"scale(0%)" }`
                }}
            >
                <RotateCcw className=" w-full h-full text-orange-400" />
            </SwipeButton>}

            <SwipeButton
                onClick={onPass}
                style={{
                    transform: `${isThresholdZero || swipeBias=="dislike" ? "scale(100%)":"scale(0%)" }`
                }}
                className={"w-16 h-16 " + (swipeBias=="dislike" ? "bg-red-600":"")}
            >
                <X className={" w-full h-full text-red-600 " + (swipeBias=="dislike" ? "text-white":"")} />
            </SwipeButton>

            <SwipeButton
                onClick={onSuperLike}

                style={{
                    transform: `${isThresholdZero || swipeBias=="superlike" ? "scale(100%)":"scale(0%)" }`
                }}
                className={"w-12 h-12  transition-colors " + (swipeBias=="superlike" ? "bg-purple-800":"")}
            >
                <Star className={"w-full h-full text-purple-800 fill-current transition-colors " + (swipeBias=="superlike" ? "text-white":"")} />
            </SwipeButton>

            <SwipeButton
                onClick={onLike}
                style={{
                    transform: `${isThresholdZero || swipeBias=="like" ? "scale(100%)":"scale(0%)" }`
                }}
                className={"w-16 h-16 transition-colors  "  + (swipeBias=="like" ? "bg-red-600 ":"")}
            >
                <Heart className={" w-full h-full text-red-600 fill-current transition-colors "+ (swipeBias=="like" ? "text-white ":"")} />
            </SwipeButton>

            { !isCompactMode && <SwipeButton
                onClick={onBoost}
                style={{
                    transform: `${isThresholdZero ? "scale(100%)":"scale(0%)" }`
                }}
                className="w-14 h-14 "
            >
                <Zap className=" w-full h-full text-purple-800 fill-current" />
            </SwipeButton>}
        </div>



    </div>
  );
};

export default SwipeActions;