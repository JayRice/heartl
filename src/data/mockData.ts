import { User, Match, Chat, Message } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Natalie',
    age: 18,
    photos: [
      'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    bio: 'Love traveling and good coffee ☕',
    distance: 11,
    interests: ['Travel', 'Coffee', 'Photography'],
    verified: true
  },
  {
    id: '2',
    name: 'Emma',
    age: 22,
    photos: [
      'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1819644/pexels-photo-1819644.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    bio: 'Yoga instructor and book lover 📚',
    distance: 5,
    interests: ['Yoga', 'Reading', 'Health'],
    verified: false
  },
  {
    id: '3',
    name: 'Sofia',
    age: 25,
    photos: [
      'https://images.pexels.com/photos/1181391/pexels-photo-1181391.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/295821/pexels-photo-295821.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2064451/pexels-photo-2064451.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    bio: 'Artist and dog mom 🐕',
    distance: 8,
    interests: ['Art', 'Dogs', 'Music'],
    verified: true
  },
  {
    id: '4',
    name: 'Olivia',
    age: 24,
    photos: [
      'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    bio: 'Fitness enthusiast and foodie 🍕',
    distance: 15,
    interests: ['Fitness', 'Food', 'Travel'],
    verified: false
  },
  {
    id: '5',
    name: 'Natalie',
    age: 18,
    photos: [
      'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    bio: 'Love traveling and good coffee ☕',
    distance: 11,
    interests: ['Travel', 'Coffee', 'Photography'],
    verified: true
  },
  {
    id: '6',
    name: 'Emma',
    age: 22,
    photos: [
      'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1819644/pexels-photo-1819644.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    bio: 'Yoga instructor and book lover 📚',
    distance: 5,
    interests: ['Yoga', 'Reading', 'Health'],
    verified: false
  },
  {
    id: '7',
    name: 'Sofia',
    age: 25,
    photos: [
      'https://images.pexels.com/photos/1181391/pexels-photo-1181391.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/295821/pexels-photo-295821.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2064451/pexels-photo-2064451.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    bio: 'Artist and dog mom 🐕',
    distance: 8,
    interests: ['Art', 'Dogs', 'Music'],
    verified: true
  },
  {
    id: '1',
    name: 'Olivia',
    age: 24,
    photos: [
      'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    bio: 'Fitness enthusiast and foodie 🍕',
    distance: 15,
    interests: ['Fitness', 'Food', 'Travel'],
    verified: false
  }
];

export const mockMatches: Match[] = [
  {
    id: '1',
    user: {
      id: '5',
      name: 'Kaye',
      age: 26,
      photos: ['https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=600'],
      verified: false
    },
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isNew: true
  },
  {
    id: '2',
    user: {
      id: '6',
      name: 'Rose',
      age: 23,
      photos: ['https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=600'],
      verified: true
    },
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    isNew: false
  }
];

export const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '5',
    receiverId: 'current-user',
    content: 'Hey! How are you doing?',
    timestamp: new Date(Date.now() - 30 * 60 * 1000)
  },
  {
    id: '2',
    senderId: 'current-user',
    receiverId: '5',
    content: 'Hi! I\'m doing great, thanks for asking!',
    timestamp: new Date(Date.now() - 25 * 60 * 1000)
  }
];

export const mockChats: Chat[] = [
  {
    id: '1',
    match: mockMatches[0],
    messages: mockMessages,
    lastMessage: mockMessages[1],
    unreadCount: 0
  }
];