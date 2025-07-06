import React from 'react';
import { Heart, Settings, MessageCircle, User } from 'lucide-react';

interface HeaderProps {
  title?: string;
  showLogo?: boolean;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  showLogo = false, 
  rightIcon, 
  onRightIconClick 
}) => {
  return (
    <header className="bg-gradient-to-r from-pink-500 to-red-500 text-white p-4 shadow-lg">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {showLogo ? (
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 fill-current" />
            <span className="text-xl font-bold">tinder</span>
          </div>
        ) : (
          <h1 className="text-xl font-bold">{title}</h1>
        )}
        
        {rightIcon && (
          <button 
            onClick={onRightIconClick}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            {rightIcon}
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;