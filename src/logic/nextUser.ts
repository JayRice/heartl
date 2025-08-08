import fillSwipeBuffer from "../server/fillSwipeBuffer.ts"
import handleSwipeAction from "../server/handleSwipeAction.ts";
import useDatabaseStore from "../../store/databaseStore.ts";
import {SwipeAction} from "../types/index.ts"

export default async function nextUser(swipeAction: SwipeAction) {
    const {
        swipeBuffer,
        user,
        setSwipeBuffer
    } = useDatabaseStore.getState(); // direct access to store values (outside hooks)


    // for actions that pause return, we'll handle this later
    if (swipeAction != "pass" && swipeAction != "like"){
        return [];
    }


    if (!swipeBuffer || !user ) return [];

    const swipeResponse = await handleSwipeAction(swipeAction, user.id, swipeBuffer[0].id );
    console.log("Response to swipe action: ", swipeResponse);



    const fillType = swipeBuffer.length === 0 ? "full":"one";
    const response = await fillSwipeBuffer(fillType, user);

    const slicedSwipeBuffer = swipeBuffer.slice(1, swipeBuffer.length >= 3 ? 3: swipeBuffer.length);

    let newSwipeBuffer = slicedSwipeBuffer;
    if (response.matches){
        newSwipeBuffer = [...slicedSwipeBuffer, ...response.matches];
    }
    setSwipeBuffer(newSwipeBuffer);

    return newSwipeBuffer;




}
