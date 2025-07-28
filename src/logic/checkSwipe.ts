

import store from "../../store/store.ts"

import {VISIBLE_THRESHOLD} from "./constants.ts";

export default function checkSwipe() : ("like"|"dislike"|"superlike"|void) {

    const thresholdRatio = store((state) => state.thresholdRatio)

    // fix later
    if (thresholdRatio[1] <= -1 ){
        return ("superlike")
    } else if (thresholdRatio[0] <= -VISIBLE_THRESHOLD){
        return ("dislike")
    }else if (thresholdRatio[0] >= VISIBLE_THRESHOLD){
        return ("like")
    }



}