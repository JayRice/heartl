// Made this dropdown element because group tailwind wasn't working for some reason :/
import React, {useState, useRef, useEffect} from "react"
interface  Props{
    id: string,
    titleName: string,
    children?: React.ReactNode,
    openSection: string,
    onOpen: (id: string) => void,
    onClose: () => void,
    className?: string,

}
export default function Dropdown({ children, id, titleName, onOpen, openSection, onClose, className="" } : Props ) {

    const [isOpen, setIsOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);


    useEffect(() => {

        setIsOpen(openSection == id)

    }, [openSection]);



    return (
        <div

            className={"font-bold p-4"}>

            <div  ref={dropdownRef} className={""}>
                <button key={id}
                        onClick={() => {
                            onOpen(id)
                        }}
                        className={"hover:bg-white hover:text-black rounded-lg p-4 hover:no-underline cursor-pointer" + (openSection == id ? " bg-white text-black":"") }>
                    {titleName}
                </button>
            </div>

            <div className={"absolute mt-2  "}>

                {(children && openSection == id && isOpen ) &&
                    children
                }
            </div>


        </div>
    )
}