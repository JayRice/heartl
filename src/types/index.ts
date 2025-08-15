type Interest = "harry-potter" | "rock-music" | "travel" | "fitness" | "anime" | "cooking" | "hiking" | "movies" | "reading" | "dancing" | "photography" | "cycling" | "yoga" | "gaming" | "football" | "basketball" | "soccer" | "volleyball" | "gym" | "meditation" | "netflix" | "star-wars" | "marvel" | "dc-comics" | "nintendo" | "board-games" | "cats" | "dogs" | "vegan" | "coffee" | "tea" | "podcasts" | "spirituality" | "entrepreneurship" | "startups" | "coding" | "fashion" | "makeup" | "poetry" | "astrology" | "tech" | "finance" | "languages" | "politics" | "philosophy" | "volunteering" | "painting" | "theater" | "tennis" | "swimming" | "running" | "skiing" | "snowboarding" | "camping" | "comedy" | "rap" | "pop-music" | "hip-hop" | "country-music" | "classical-music" | "metal" | "indie" | "k-pop" | "j-pop" | "travel-photography" | "luxury" | "minimalism" | "thrifting" | "cars" | "motorcycles" | "science" | "nature" | "clubbing" | "festivals" | "tattoos" | "piercings" | "manga" | "cosplay" | "esports" | "baking" | "surfing" | "scuba-diving" | "pets" | "home-decor" | "parenting" | "gardening" | "investing" | "real-estate" | "self-improvement" | "journaling" | "biking" | "roller-skating" | "ceramics" | "woodworking" | "magic" | "photobooths" | "karaoke" | "standup" | "philosophy-books" | "rom-coms" | "horror-movies" | "documentaries";

export type SwipeAction = "undo" | "pass" |"superlike" |"like" |"boost";


export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: Date; // or Firebase Timestamp if you prefer
  read?: boolean;
  localKey?: string;
  status?: "sent" | "pending" | "failed";
  type?: 'text' | 'image' | 'video' | 'system'; // optional, supports media & system messages
  mediaUrls?: string[]; // for image/video messages
}

export interface Conversation {
  id: string; // Firestore doc ID
  participantIds: [string,string]; // array of user IDs
  lastMessage?: string; // preview text
  updatedAt: Date; // or Firebase Timestamp
  createdAt: Date; // or Firebase Timestamp
}

export interface Match {
  user1Id: string;
  user2Id: string;
  createdAt: Date;
}

export interface User {
  // 🔐 Identification
  id: string;
  email: string;
  phone: string;

  // 👤 Core profile
  profile: {
    name: string;
    birthday: string;
    gender: "male" | "female" | "non-binary" | null;
    sexual_orientation?: "straight" | "gay" | "lesbian" | "bisexual" | "asexual";
    bio?: string;
    imageIds?: string[];
    verified?: boolean;
    profileComplete?: boolean;
    showMeOnDiscover?: boolean;
  };

  // ❤️ Dating preferences
  preferences: {
    interested_in: "male" | "female" | "everyone" | null;
    intent: "long-term" | "long-term-open-short" | "short-term-open-long" | "short-term" | "friends" | "figuring-out" | null;
    interests?: Interest[];
  };

  // 📍 Location
  location?: {
    latitude: number;
    longitude: number;
    city?: string;
    state?: string;
    country?: string;
  };

  // 🔎 Discovery filters
  filters?: {
    maxDistanceMi?: number;
    ageRange?: [number, number];
    showOnlyVerified?: boolean;
  };

  // 🧠 App state
  appState?: {
    lastActive?: number;
    createdAt?: number;
    isOnline?: boolean;
  };

  // 🔗 Relationships
  relations: {
    conversationIds: string[];
  };

  // 🚫 Behavior tracking
  activity?: {
    likedByIds?: string[];
    seenBeforeIds?: string[];
    blockedIds?: string[];
    reportedByIds?: string[];
    matchIds?: string[];

  };

  data?: {
    signedUrls?: string[];
    imageUrls?: string[];
  }
}