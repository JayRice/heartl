
import {ANIMATION_INTERVAL} from "./constants.ts";

export default async function animateSwipe(dir: "left" | "right" | "up" , el: HTMLElement) {

    el.style.transition = 'transform 0.5s ease';



    return new Promise((resolve) => {
        if(dir === "left"){

            el.style.transform = `translate(-800px, 0) rotate(-45deg)`

        }else if (dir == "right"){
            el.style.transform = `translate(800px, 0) rotate(45deg) `

        }else if (dir == "up"){
            el.style.transform = `translate(0px, -1000px)`
        }
        setTimeout(() => {

            // PUT SERVER FUNC HERE
            el.style.transition = 'none';
            el.style.transform = `translate(0px, 0px)`

            return resolve(true);

        }, ANIMATION_INTERVAL)

    })




}