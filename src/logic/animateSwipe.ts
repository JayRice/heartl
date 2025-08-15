
import {ANIMATION_INTERVAL} from "./constants.ts";

export default async function animateSwipe(dir: "left" | "right" | "up" , el: HTMLElement) {

    console.log("Animating: ", dir)
    if (ANIMATION_INTERVAL < 1000){
        el.style.transition = `transform 0.${ANIMATION_INTERVAL}s ease`;
    }else {
        el.style.transition = `transform ${ANIMATION_INTERVAL/1000}s ease`;

    }



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
            el.style.transition = "none"

            return resolve(true);

        }, ANIMATION_INTERVAL)

    })




}