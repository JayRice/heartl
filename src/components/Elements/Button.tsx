
import {ReactNode} from "react"

export default function Button ({ children, onClick, isSelected=false, className="", disabled=false} : {children: ReactNode,  onClick:() => void, isSelected?: boolean, className?:string, disabled?:boolean,}) {


    console.log(disabled)
    const disabledClasses = " " + (disabled ? "cursor-default":"cursor-pointer hover:bg-secondary") + " "
    const selectedClasses = " " + (isSelected ? "border-red-600 ": "border-complementary") + " "

    return (

        <div

            onClick={() => {
                if(disabled) return;

                onClick()
            }}
            className={"select-none   rounded-[60px]  px-4 py-2 text-white bg-primary border-[1px] border-complementary   transition-colors " + disabledClasses + selectedClasses + className}
        >
            {children}




        </div>


    )
}