import React from 'react';
import { Heart, MessageCircle, User, Star } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'discover' | 'matches' | 'messages' | 'profile';
  onTabChange: (tab: 'discover' | 'matches' | 'messages' | 'profile') => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'discover', icon: Heart, label: 'Discover' },
    { id: 'matches', icon: Star, label: 'Matches' },
    { id: 'messages', icon: MessageCircle, label: 'Messages' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 z-50">
      <div className="max-w-md mx-auto flex items-center justify-around py-2">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id as "discover" | "matches" | "messages" | "profile")}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              activeTab === id 
                ? 'text-pink-500' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Icon className={`h-6 w-6 ${activeTab === id ? 'fill-current' : ''}`} />
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;