import React from 'react';
import { RotateCcw, X, Star, Heart, Zap } from 'lucide-react';

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
    <div className="flex items-center justify-center space-x-4 py-4">
      <button
        onClick={onUndo}
        className="w-12 h-12 bg-yellow-500 hover:bg-yellow-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
      >
        <RotateCcw className="h-6 w-6 text-white" />
      </button>
      
      <button
        onClick={onPass}
        className="w-14 h-14 bg-gray-500 hover:bg-gray-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
      >
        <X className="h-7 w-7 text-white" />
      </button>
      
      <button
        onClick={onSuperLike}
        className="w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
      >
        <Star className="h-6 w-6 text-white fill-current" />
      </button>
      
      <button
        onClick={onLike}
        className="w-14 h-14 bg-pink-500 hover:bg-pink-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
      >
        <Heart className="h-7 w-7 text-white fill-current" />
      </button>
      
      <button
        onClick={onBoost}
        className="w-12 h-12 bg-purple-500 hover:bg-purple-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
      >
        <Zap className="h-6 w-6 text-white fill-current" />
      </button>
    </div>
  );
};

export default SwipeActions;