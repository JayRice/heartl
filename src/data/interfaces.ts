export type Interest = "harry-potter" | "rock-music" | "travel" | "fitness" | "anime" | "cooking" | "hiking" | "movies" | "reading" | "dancing" | "photography" | "cycling" | "yoga" | "gaming" | "football" | "basketball" | "soccer" | "volleyball" | "gym" | "meditation" | "netflix" | "star-wars" | "marvel" | "dc-comics" | "nintendo" | "board-games" | "cats" | "dogs" | "vegan" | "coffee" | "tea" | "podcasts" | "spirituality" | "entrepreneurship" | "startups" | "coding" | "fashion" | "makeup" | "poetry" | "astrology" | "tech" | "finance" | "languages" | "politics" | "philosophy" | "volunteering" | "painting" | "theater" | "tennis" | "swimming" | "running" | "skiing" | "snowboarding" | "camping" | "comedy" | "rap" | "pop-music" | "hip-hop" | "country-music" | "classical-music" | "metal" | "indie" | "k-pop" | "j-pop" | "travel-photography" | "luxury" | "minimalism" | "thrifting" | "cars" | "motorcycles" | "science" | "nature" | "clubbing" | "festivals" | "tattoos" | "piercings" | "manga" | "cosplay" | "esports" | "baking" | "surfing" | "scuba-diving" | "pets" | "home-decor" | "parenting" | "gardening" | "investing" | "real-estate" | "self-improvement" | "journaling" | "biking" | "roller-skating" | "ceramics" | "woodworking" | "magic" | "photobooths" | "karaoke" | "standup" | "philosophy-books" | "rom-coms" | "horror-movies" | "documentaries";




export interface User {
    id: string,
    name: string,
    email: string,
    phone: string,
    birthday: [string ,string, string],
    gender: "male" | "female" | "non-binary",
    interested_in: "men" | "women" | "everyone",
    intent: "long-term" | "long-term-open-short" | "short-term-open-long" | "short-term" | "friends" | "figuring-out"
    interests?: Interest[],
    sexual_orientation?: "straight" | "gay" | "lesbian" | "bisexual" | "asexual"
}