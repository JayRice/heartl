import {ReactNode} from 'react'
import Logo from "../Elements/Logo"

export default function SimpleTopNav({children} : {children?: ReactNode}) {
    return (
        <div className={"relative flex w-full bg-primary h-full p-2 "}>
            <Logo classNameParent={"h-full text-sm"} classNameHeart={"text-red-600 w-8 h-8"} classNameText={"text-red-600 text-md"}></Logo>

            {children}
        </div>
    )
}