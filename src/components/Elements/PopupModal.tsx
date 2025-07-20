import React, {useEffect, useRef} from "react"
import {X} from "lucide-react";


interface Props {
    onClose: () => void;
    children: React.ReactNode;
    titleClassName?: string;
    closeOnClick?:boolean;
    showX?: boolean;
    title?: string;
    className?: string;
}
export default function PopupModal({ children, onClose, closeOnClick=true, showX=true,  title="", className="", titleClassName=""} : Props) {

    const modalRef = useRef<HTMLDivElement>(null);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // Only close if you click directly on the backdrop (not on its children)
        if (closeOnClick && e.target === e.currentTarget) {
            onClose();
        }
    };
    // useEffect(() => {
    //     function handleClickOutside(event: MouseEvent) {
    //
    //         if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
    //             console.log(!modalRef.current.contains(event.target as Node));
    //            onClose();
    //         }
    //     }
    //
    //     document.addEventListener('mousedown', handleClickOutside);
    //
    //
    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, []);

    return (
        <div  onMouseDown={handleBackdropClick} className="fixed w-full  mx-auto z-50 bg-secondary bg-opacity-70 h-full flex justify-center select-none">
            <div  className={""}>

                <div  className={" w-[500px] max-w-[500px] bg-primary flex flex-col text-white items-center p-8 mt-[10vh] rounded-xl justify-center  "}>


                    { showX &&
                        <X onClick={() => {
                            onClose()
                        }} className={"w-8 h-8 text-white ml-auto cursor-pointer hover:text-gray-400 "}></X>

                    }

                    <div className={className}>
                        <h1 className={"font-bold text-3xl text-left w-full " + titleClassName}>{title}</h1>


                        {children}
                    </div>


                </div>
            </div>
        </div>
                    )
}