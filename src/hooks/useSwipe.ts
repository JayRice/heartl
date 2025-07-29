import { useEffect } from "react";

import {SWIPE_THRESHOLD} from "../logic/constants.ts"

import useStore from "../../store/store.ts"
import {mockUsers} from "../data/mockData.ts";


import handleSwipe from "../logic/handleSwipe.ts"

import {ANIMATION_INTERVAL} from "../logic/constants.ts"

export const useSwipe = ( ref: React.RefObject<HTMLElement> | ((instance: HTMLElement | null) => void), compactMode?: boolean ) => {

  useEffect(() => {

    if(compactMode){ return}

    const frame = requestAnimationFrame(() => {

      /////////////////////// HOW TO PASS FORWARDED REF TO A HOOK /////////////////////////////////////
      const el =
          typeof ref === 'function' || ref === undefined
              ? null // can't use it directly
              : ref?.current;



      ///////////////////////////////////////////////////////

      if (!el) return;

      el.style.transition = 'none';
      el.style.transform = 'translate(0, 0) rotate(0deg)';



      let startX = 0;
      let startY = 0;
      let isDragging = false;
      let canDrag = true;
      const setThresholdRatio = useStore.getState().setThresholdRatio;

      const nextUser = () => {
        const currentUserIndex = useStore.getState().currentUserIndex;
        useStore.getState().setCurrentUserIndex((currentUserIndex + 1) % mockUsers.length);
      }











      const onPointerDown = (e: PointerEvent) => {

        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        el.setPointerCapture(e.pointerId);
      };

      const onPointerMove = (e: PointerEvent) => {
        if (!isDragging) return;

        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        setThresholdRatio([dx / SWIPE_THRESHOLD,dy / SWIPE_THRESHOLD]);

        // Example transform
        el.style.transform = `translate(${dx}px, ${dy}px) rotate(${dx / 10}deg)`;
      };

      const onPointerUp = (e: PointerEvent) => {

        setThresholdRatio([0,0])
        if (!isDragging) return;
        isDragging = false;

        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        // Threshold logic
        if (Math.abs(dx) > SWIPE_THRESHOLD) {

          handleSwipe(dx > 0 ? 'right' : 'left', el);
        } else if (dy < -SWIPE_THRESHOLD) {
          handleSwipe('up', el);
        } else {

          el.style.transition = 'transform 0.3s ease';
          el.style.transform = `translate(0, 0) rotate(0deg)`;
          setTimeout(() => {
            el.style.transition = 'none';
          }, 300)
          return;
        }

        setTimeout(() => {
          nextUser()

        }, ANIMATION_INTERVAL)




        el.releasePointerCapture(e.pointerId);
      };

      el.addEventListener('pointerdown', onPointerDown);
      el.addEventListener('pointermove', onPointerMove);
      el.addEventListener('pointerup', onPointerUp);

      return () => {
        el.removeEventListener('pointerdown', onPointerDown);
        el.removeEventListener('pointermove', onPointerMove);
        el.removeEventListener('pointerup', onPointerUp);
      };

    })

    return () => cancelAnimationFrame(frame);



  }, [ref]);
};