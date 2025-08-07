import fillSwipeBuffer from "../server/fillSwipeBuffer.ts"
import useDatabaseStore from "../../store/databaseStore.ts";

export default async function nextUser() {
    const {
        swipeBuffer,
        user,
        setSwipeBuffer
    } = useDatabaseStore.getState(); // direct access to store values (outside hooks)

    if (!swipeBuffer || !user) return;

    const response = await fillSwipeBuffer("one", user);

    const slicedSwipeBuffer = swipeBuffer.slice(1, swipeBuffer.length);

    if (response.success && response.match ) {
        setSwipeBuffer([...slicedSwipeBuffer, response.match]);
    } else {
        setSwipeBuffer(slicedSwipeBuffer);
    }
}
