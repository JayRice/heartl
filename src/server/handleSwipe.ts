import {mockUsers} from "../data/mockData.ts";

export function getSwipeUsers(currentUserIndex : number){
    return mockUsers.slice(currentUserIndex, currentUserIndex + 3)
}