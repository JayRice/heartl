import React, { useEffect, useRef, useState } from 'react';

const AutoSlider = ({children} : {children: React.ReactNode}) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalSlides = React.Children.count(children);
    const intervalTime = 4000;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % totalSlides);
        }, intervalTime);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const slide = container.children[currentIndex] as HTMLElement;
        if (slide) {
            const containerWidth = container.offsetWidth;
            const slideWidth = containerWidth / 3;
            const offset = slideWidth * currentIndex;
            container.scrollTo({ left: offset, behavior: 'smooth' });
        }
    }, [currentIndex]);



    return (
        <div
            ref={containerRef}
            className="flex scroll-smooth  select-none no-scrollbar overflow-x-hidden bg-primary w-[100%]  "
        >
            {React.Children.map(children, (child : React.ReactNode) => (
                <div  className="min-w-[33.3333%] p-4 h-full  text-white flex items-center justify-center text-2xl rounded-xl">
                    {child}
                </div>
            ))}

        </div>
    );
};

export default AutoSlider;
