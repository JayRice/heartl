type Interest = "harry-potter" | "rock-music" | "travel" | "fitness" | "anime" | "cooking" | "hiking" | "movies" | "reading" | "dancing" | "photography" | "cycling" | "yoga" | "gaming" | "football" | "basketball" | "soccer" | "volleyball" | "gym" | "meditation" | "netflix" | "star-wars" | "marvel" | "dc-comics" | "nintendo" | "board-games" | "cats" | "dogs" | "vegan" | "coffee" | "tea" | "podcasts" | "spirituality" | "entrepreneurship" | "startups" | "coding" | "fashion" | "makeup" | "poetry" | "astrology" | "tech" | "finance" | "languages" | "politics" | "philosophy" | "volunteering" | "painting" | "theater" | "tennis" | "swimming" | "running" | "skiing" | "snowboarding" | "camping" | "comedy" | "rap" | "pop-music" | "hip-hop" | "country-music" | "classical-music" | "metal" | "indie" | "k-pop" | "j-pop" | "travel-photography" | "luxury" | "minimalism" | "thrifting" | "cars" | "motorcycles" | "science" | "nature" | "clubbing" | "festivals" | "tattoos" | "piercings" | "manga" | "cosplay" | "esports" | "baking" | "surfing" | "scuba-diving" | "pets" | "home-decor" | "parenting" | "gardening" | "investing" | "real-estate" | "self-improvement" | "journaling" | "biking" | "roller-skating" | "ceramics" | "woodworking" | "magic" | "photobooths" | "karaoke" | "standup" | "philosophy-books" | "rom-coms" | "horror-movies" | "documentaries";

export interface User {
  id: string;
  name: string,
  email: string,
  phone: string,
  birthday: [string ,string, string],
  gender: "male" | "female" | "non-binary" | null,
  interested_in: "men" | "women" | "everyone" | null,
  intent: "long-term" | "long-term-open-short" | "short-term-open-long" | "short-term" | "friends" | "figuring-out" | null
  interests?: Interest[],
  sexual_orientation?: "straight" | "gay" | "lesbian" | "bisexual" | "asexual"
  conversationIds: string[];
  matchIds: string[];
  imageIds?: string[];

}

export interface Match {
  id: string;
  userId: string;
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
export interface Conversation {
  id: string;
  messages: Message[];
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