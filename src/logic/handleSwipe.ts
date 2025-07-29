import {onSwipe} from "../server/handleSwipe.ts";

export default function handleSwipe(dir: "left" | "right" | "up", el: HTMLElement) {

    console.log("handleSwipe", dir, el);
    el.style.transition = 'transform 0.5s ease';


    if(dir === "left"){

        el.style.transform = `translate(-800px, 0) rotate(-45deg)`

    }else if (dir == "right"){
        el.style.transform = `translate(800px, 0) rotate(45deg) `

    }else if (dir == "up"){
        el.style.transform = `translate(0px, -1000px)`
    }
    onSwipe(dir);
    setTimeout(() => {
        el.style.transition = 'none';

    }, 500)



}