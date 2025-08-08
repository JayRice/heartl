import {ReactNode} from 'react'
import Logo from "../Elements/Logo"

export default function SimpleTopNav({children} : {children?: ReactNode}) {
    return (
        <div className={"absolute top-0 flex w-full bg-primary h-8 p-2 "}>
            {children}
        </div>
    )
}