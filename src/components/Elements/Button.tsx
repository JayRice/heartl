
import {ReactNode} from "react"

export default function Button ({ children, onClick, isSelected=false, className="", disabled=false} : {children: ReactNode,  onClick:() => void, isSelected?: boolean, className?:string, disabled?:boolean,}) {

    const disabledClasses = "cursor-default hover:bg-primary "
    return (

        <div

            onClick={() => {
                if(disabled) return;

                onClick()
            }}
            className={" cursor-pointer  rounded-[60px]  px-4 py-2 text-white bg-primary border-2 border-complementary  hover:bg-secondary transition-colors " + (disabled ? disabledClasses : " ") + (isSelected ? "border-red-600 ": "border-complementary ") + className}
        >
            {children}




        </div>


    )
}