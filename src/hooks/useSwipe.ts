import { useState } from 'react';
import { useSpring } from 'react-spring';
import { useDrag } from 'react-use-gesture';

export const useSwipe = (onSwipe: (direction: 'left' | 'right' | 'up') => void) => {
  const [{ x, y, rotate, scale }, set] = useSpring(() => ({
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    config: { friction: 50 ,tension: 500 }
  }));

  const bind = useDrag(({ args: [index], down, movement: [mx, my], direction, velocity }) => {
    const trigger = velocity > 0.2;
    const dir = direction[0] < 0 ? -1 : 1;
    
    if (!down && trigger) {
      if (Math.abs(mx) > Math.abs(my)) {
        // Horizontal swipe
        onSwipe(dir > 0 ? 'right' : 'left');
      } else if (my < -50) {
        // Upward swipe for super like
        onSwipe('up');
      }
    }
    
    set({
      x: down ? mx : 0,
      y: down ? my : 0,
      rotate: down ? mx / 10 : 0,
      scale: down ? 1.1 : 1
    });
  });

  return { bind, style: { x, y, rotate, scale } };
};