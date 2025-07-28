import { useEffect } from "react";

import {SWIPE_THRESHOLD} from "../logic/constants.ts"

import useStore from "../../store/store.ts"

export const useSwipe = (ref: React.RefObject<HTMLElement>, onSwipe: (dir: 'left' | 'right' | 'up') => void) => {
  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    let startX = 0;
    let startY = 0;
    let isDragging = false;
    let canDrag = true;
    const setThresholdRatio = useStore.getState().setThresholdRatio;


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
        onSwipe(dx > 0 ? 'right' : 'left');
        el.style.transform = `translate(${dx > 0 ? 1000 : -1000}px, 0) rotate(${dx > 0 ? 45 : -45}deg)`;
      } else if (dy < -SWIPE_THRESHOLD) {
        onSwipe('up');
        el.style.transform = `translate(0, -1000px)`;
      } else {

        el.style.transition = 'transform 0.3s ease';
        el.style.transform = `translate(0, 0) rotate(0deg)`;
        setTimeout(() => {
          el.style.transition = 'none';
        }, 300)
      }

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
  }, [ref, onSwipe]);
};