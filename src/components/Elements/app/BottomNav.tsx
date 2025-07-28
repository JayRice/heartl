import React from 'react';
import { Heart, MessageCircle, User, Stars, Search  } from 'lucide-react';

interface Props {
  activeTab: 'discover' | 'matches' | 'messages' | 'profile';
  onTabChange: (tab: 'discover' | 'matches' | 'messages' | 'profile') => void;
}

const BottomNav: React.FC<Props> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'discover', icon: Heart, label: 'Discover' },
    { id: 'matches', icon: Search, label: 'Matches' },
    {id: "premium", icon: Stars, label: 'Premium' },
    { id: 'messages', icon: MessageCircle, label: 'Messages' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black ">
      <div className="w-full mx-auto flex items-center justify-evenly ">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            title={label}
            onClick={() => onTabChange(id as "discover" | "matches" | "messages" | "profile")}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              activeTab === id 
                ? 'text-pink-500' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Icon className={`h-6 w-6  fill-current ${activeTab === id ? 'text-red-600' : ''}`} />
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;