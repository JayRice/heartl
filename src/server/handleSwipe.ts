import {mockUsers} from "../data/mockData.ts";
export function getSwipeUsers(currentUserIndex : number){

    // change when implementing swipe
    return mockUsers.slice(currentUserIndex, currentUserIndex + 3)
}

export function onSwipe(dir: 'left' | 'right' | 'up'){
    console.log(dir)
}

