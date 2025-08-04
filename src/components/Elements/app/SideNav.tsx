import {ReactNode} from "react"
import {Stars, Search, LucideNewspaper, Shield } from "lucide-react"
interface Props {

    children: ReactNode;
}
export default function SideNav({children}:  Props){

    return (
        <div className={"w-full h-full bg-primary border-2"}>
            <nav className={"lg:block hidden relative h-20 w-full  bg-gradient-to-br from-red-500 to-red-600 text-white "}>

                <div className={" absolute left-0 flex top-4 p-2 gap-2 text-white  font-bold items-center hover:bg-black rounded-3xl ml-2 cursor-pointer transition-colors "}>
                    <img className={"rounded-full w-8 h-8"}
                        src={"https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200"}></img>
                    <p>You</p>
                </div>


                <div className={"w-full h-full flex justify-end items-center gap-4 pr-4"}>
                    <div className={"w-10 h-10 rounded-full flex justify-center items-center p-2 bg-primary  hover:scale-110 cursor-pointer text-purple-700 transition-transform"}>

                        <Stars className={"w-full h-full"}></Stars>
                    </div>
                    <div className={"w-10 h-10 rounded-full flex justify-center items-center p-2 bg-primary  hover:text-red-600 cursor-pointer transition-colors "}>

                        <Search className={"w-full h-full hover:text-red-600 "}></Search>
                    </div>
                    <div className={"w-10 h-10 rounded-full flex justify-center items-center p-2 bg-primary  hover:text-red-600 cursor-pointer transition-colors "}>

                        <LucideNewspaper className={"w-full h-full hover:text-red-600 "}></LucideNewspaper>
                    </div>
                    <div className={"w-10 h-10 rounded-full flex justify-center items-center p-2 bg-primary    cursor-pointer transition-colors "}>

                        <Shield className={"w-full h-full hover:text-blue-600 hover:fill-blue-600 fill-white"}></Shield>
                    </div>
                </div>

            </nav>

            {children}
        </div>
    )
}