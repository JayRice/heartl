import fillSwipeBuffer from "../server/fillSwipeBuffer.ts"
import handleSwipeAction from "../server/handleSwipeAction.ts";
import {SwipeAction} from "../types/index.ts"
import useStore from "../../store/store.ts";
import useDatabaseStore from "../../store/databaseStore.ts";


export default async function nextUser(swipeAction: SwipeAction, otherUserId: string) {
    const {
        user
    } = useDatabaseStore.getState();
    const {
        swipeBuffer
    } = useStore.getState(); // direct access to store values (outside hooks)


    // for actions that pause return, we'll handle this later
    if (swipeAction != "pass" && swipeAction != "like"){
        return [];
    }


    if (!swipeBuffer || !user ) return [];


    console.log(user)
    const swipeResponse = await handleSwipeAction(swipeAction, user.id, otherUserId );
    console.log("Response to swipe action: ", swipeResponse);



    const fillType = swipeBuffer.length === 0 ? "full":"one";
    const response = await fillSwipeBuffer(fillType, user);

    return response.matches;




}
