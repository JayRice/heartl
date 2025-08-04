// 0-1
export const VISIBLE_THRESHOLD = 0.05;

export const SWIPE_THRESHOLD = 100;
export const ANIMATION_INTERVAL = 250;

export const PAUSE_SWIPE_BUTTON_INTERVAL = 500;

export const sanitize = (input: string) => {
    return input.replace(/[^a-zA-Z0-9._-]/g, '_');
};
