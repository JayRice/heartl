import React from 'react';
import { Heart, MessageCircle, User, Stars, Search  } from 'lucide-react';

interface Props {
  activeTab: 'recs' | 'matches' | 'discover' | 'messages' | 'profile';
  onTabChange: (tab: 'recs' | 'discover' | 'messages' | 'profile') => void;
}

const BottomNav: React.FC<Props> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'recs', icon: Heart, label: 'Recs' },
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
            onClick={() => onTabChange(id as 'recs' | 'discover' | 'messages' | 'profile')}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              activeTab === id 
                ? 'text-pink-500' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Icon className={`h-6 w-6 fill-current ${(id == "matches") && "fill-none"} ${activeTab === id ? 'text-red-600' : ''}`} />
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;