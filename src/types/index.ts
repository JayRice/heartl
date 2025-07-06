export interface User {
  id: string;
  name: string;
  age: number;
  photos: string[];
  bio?: string;
  distance?: number;
  interests?: string[];
  verified?: boolean;
}

export interface Match {
  id: string;
  user: User;
  timestamp: Date;
  isNew?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read?: boolean;
}

export interface Chat {
  id: string;
  match: Match;
  messages: Message[];
  lastMessage?: Message;
  unreadCount?: number;
}

export interface SwipeAction {
  type: 'like' | 'pass' | 'superlike';
  userId: string;
}