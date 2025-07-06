import React, { useEffect } from 'react';
import { Heart, X } from 'lucide-react';
import { User } from '../../types';

interface MatchNotificationProps {
  user: User;
  onClose: () => void;
  onSendMessage: () => void;
}

const MatchNotification: React.FC<MatchNotificationProps> = ({ 
  user, 
  onClose, 
  onSendMessage 
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl p-8 max-w-md w-full text-center text-white relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="mb-6">
          <Heart className="h-16 w-16 mx-auto mb-4 text-pink-200 fill-current animate-pulse" />
          <h2 className="text-2xl font-bold mb-2">It's a Match!</h2>
          <p className="text-pink-100">You and {user.name} liked each other</p>
        </div>
        
        <div className="flex items-center justify-center space-x-4 mb-6">
          <img
            src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200"
            alt="You"
            className="w-20 h-20 object-cover rounded-full border-4 border-white"
          />
          <div className="flex flex-col items-center">
            <Heart className="h-8 w-8 text-pink-200 fill-current" />
          </div>
          <img
            src={user.photos[0]}
            alt={user.name}
            className="w-20 h-20 object-cover rounded-full border-4 border-white"
          />
        </div>
        
        <div className="space-y-3">
          <button
            onClick={onSendMessage}
            className="w-full bg-white text-pink-500 font-bold py-3 rounded-2xl hover:bg-gray-100 transition-colors"
          >
            Send Message
          </button>
          <button
            onClick={onClose}
            className="w-full bg-white/20 text-white font-bold py-3 rounded-2xl hover:bg-white/30 transition-colors"
          >
            Keep Swiping
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchNotification;