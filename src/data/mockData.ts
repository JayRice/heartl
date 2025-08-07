import { User, Match, Chat, Message } from '../types';

export const mockUsers: User[] = [
  {
    id: "1",
    email: "",
    phone: "",
    profile: {
      name: "Natalie",
      birthday: "2006-01-01",
      gender: "female",
      verified: true,
      bio: "Love traveling and good coffee ☕",
      imageIds: [
        "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=600"
      ]
    },
    preferences: {
      interested_in: "men",
      intent: "long-term",
      interests: ["harry-potter" , "rock-music" , "travel"]
    },
    location: {
      latitude: -77.428658,
      longitude: -93.118083
    },
    relations: {
      conversationIds: [],
      matchIds: []
    }
  },
  {
    id: "2",
    email: "",
    phone: "",
    profile: {
      name: "Emma",
      birthday: "2002-05-10",
      gender: "female",
      verified: false,
      bio: "Yoga instructor and book lover 📚",
      imageIds: [
        "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=600"
      ]
    },
    preferences: {
      interested_in: "men",
      intent: "long-term",
      interests: ["harry-potter" , "rock-music" , "travel"]
    },
    location: {
      latitude: 59.602622,
      longitude: -123.091003
    },
    relations: {
      conversationIds: [],
      matchIds: []
    }
  },
  {
    id: "3",
    email: "",
    phone: "",
    profile: {
      name: "Sofia",
      birthday: "2000-09-12",
      gender: "female",
      verified: true,
      bio: "Artist and dog mom 🐕",
      imageIds: [
        "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=600"
      ]
    },
    preferences: {
      interested_in: "men",
      intent: "long-term",
      interests: ["harry-potter" , "rock-music" , "travel"]
    },
    location: {
      latitude: 33.947321,
      longitude: 90.440576
    },
    relations: {
      conversationIds: [],
      matchIds: []
    }
  },
  {
    id: "4",
    email: "",
    phone: "",
    profile: {
      name: "Olivia",
      birthday: "2001-03-22",
      gender: "female",
      verified: false,
      bio: "Fitness enthusiast and foodie 🍕",
      imageIds: [
        "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=600"
      ]
    },
    preferences: {
      interested_in: "men",
      intent: "long-term",
      interests: ["harry-potter" , "rock-music" , "travel"]
    },
    location: {
      latitude: -40.020009,
      longitude: -18.476416
    },
    relations: {
      conversationIds: [],
      matchIds: []
    }
  },
  // ... repeat users 5–8 same as above with unique ids
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