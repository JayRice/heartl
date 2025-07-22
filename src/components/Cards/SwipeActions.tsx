import React from 'react';
import { RotateCcw, X, Star, Heart, Zap } from 'lucide-react';

import SwipeButton from "./SwipeButton.tsx"

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
  return (
    <div className="absolute z-50 flex items-center justify-evenly gap-2 py-4 px-8">

        <div className={"absolute w-full p-4 "}>
            <div className={"w-full h-4  rounded-b-full bg-[#21252E] bg-opacity-50 "}></div>
        </div>

      <SwipeButton
        onClick={onUndo}
        className="w-12 h-12 "
      >
        <RotateCcw className=" w-full h-full text-orange-400" />
      </SwipeButton>

      <SwipeButton
        onClick={onPass}
        className="w-16 h-16 "
      >
        <X className=" w-full h-full text-red-600" />
      </SwipeButton>
      
      <SwipeButton
        onClick={onSuperLike}
        className="w-12 h-12 "
      >
        <Star className="w-full h-full text-purple-800 fill-current" />
      </SwipeButton>
      
      <SwipeButton
        onClick={onLike}
        className="w-16 h-16 "
      >
        <Heart className=" w-full h-full text-red-600 fill-current" />
      </SwipeButton>
      
      <SwipeButton
        onClick={onBoost}
        className="w-12 h-12 "
      >
        <Zap className=" w-full h-full text-purple-800 fill-current" />
      </SwipeButton>


    </div>
  );
};

export default SwipeActions;