import {mockUsers} from "../../data/mockData.ts";
import SwipeCard from "../Cards/SwipeCard.tsx";
import SwipeActions from "../Cards/SwipeActions.tsx";

interface Props {
    currentUserIndex: number;
    handleSwipe: (action : 'left' | 'right' | 'up') => void;
}
export default function DiscoverTab ({currentUserIndex, handleSwipe}: Props) {
    return (
        <div className="flex-1 flex flex-col">
            <div className="flex-1 relative p-4 max-w-md mx-auto w-full ">
                <div className="relative h-[68vh] min-h-[100px]">
                    {mockUsers.slice(currentUserIndex, currentUserIndex + 3).map((user, index) => (
                        <SwipeCard
                            key={user.id}
                            user={user}
                            onSwipe={handleSwipe}
                            style={{
                                zIndex: 3 - index,
                                transform: `scale(${1 - index * 0.05}) translateY(${index * 4}px)`,
                                opacity: 1 - index * 0.3
                            }}
                        />
                    ))}
                </div>

                <SwipeActions
                    onUndo={() => console.log('Undo')}
                    onPass={() => handleSwipe('left')}
                    onSuperLike={() => handleSwipe('up')}
                    onLike={() => handleSwipe('right')}
                    onBoost={() => console.log('Boost')}
                />
            </div>
        </div>
    )
}