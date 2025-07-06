import React from 'react';
import { animated } from 'react-spring';
import { MapPin, Shield } from 'lucide-react';
import { User } from '../../types';
import { useSwipe } from '../../hooks/useSwipe';

interface SwipeCardProps {
  user: User;
  onSwipe: (direction: 'left' | 'right' | 'up') => void;
  style?: React.CSSProperties;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ user, onSwipe, style }) => {
  const { bind, style: swipeStyle } = useSwipe(onSwipe);

  return (
    <animated.div
      {...bind()}
      style={{ ...swipeStyle, ...style }}
      className="absolute w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing"
    >
      <div className="relative h-full">
        <img
          src={user.photos[0]}
          alt={user.name}
          className="w-full h-full object-cover"
          draggable={false}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <span className="text-xl">{user.age}</span>
              {user.verified && (
                <Shield className="h-5 w-5 text-blue-400 fill-current" />
              )}
            </div>
          </div>
          
          {user.distance && (
            <div className="flex items-center space-x-1 mb-2">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{user.distance} kilometers away</span>
            </div>
          )}
          
          {user.bio && (
            <p className="text-sm mb-3 line-clamp-2">{user.bio}</p>
          )}
          
          {user.interests && (
            <div className="flex flex-wrap gap-2">
              {user.interests.slice(0, 3).map((interest) => (
                <span
                  key={interest}
                  className="px-2 py-1 bg-white/20 rounded-full text-xs backdrop-blur-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </animated.div>
  );
};

export default SwipeCard;