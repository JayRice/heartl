import fillSwipeBuffer from "../server/fillSwipeBuffer.ts"
import useDatabaseStore from "../../store/databaseStore.ts";
import {SEARCH_FOR_SWIPES_INTERVAL, SEARCH_FOR_SWIPES_TIMES} from "./constants.ts";


export default async function nextUser() {
    const {
        swipeBuffer,
        user,
        setSwipeBuffer
    } = useDatabaseStore.getState(); // direct access to store values (outside hooks)

    if (!swipeBuffer || !user) return [];

    const response = await fillSwipeBuffer("one", user);

    const slicedSwipeBuffer = swipeBuffer.slice(1, swipeBuffer.length);

    const newSwipeBuffer = [...slicedSwipeBuffer, ...(response.match ?? [])];
    setSwipeBuffer(newSwipeBuffer);
    return newSwipeBuffer;




}
