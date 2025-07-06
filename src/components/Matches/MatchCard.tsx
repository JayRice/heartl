import React from 'react';
import { Match } from '../../types';

interface MatchCardProps {
  match: Match;
  onClick: () => void;
}

const MatchCard: React.FC<MatchCardProps> = ({ match, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="flex-shrink-0 w-20 h-20 relative cursor-pointer"
    >
      <img
        src={match.user.photos[0]}
        alt={match.user.name}
        className="w-full h-full object-cover rounded-full border-2 border-pink-500"
      />
      {match.isNew && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full border-2 border-white"></div>
      )}
    </div>
  );
};

export default MatchCard;