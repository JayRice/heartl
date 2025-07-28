import Logo from "../Elements/Logo"
import  {useEffect, useRef, useState} from "react";
import Dropdown from "./Dropdown.tsx";
import {ChevronDown, Menu, X} from "lucide-react"
export default function TopNav({onAuth} : {onAuth: (mode : 'login' | 'signup') => void}) {


    const [openSection, setOpenSection] = useState<string>("");

    const productsDropdownRef = useRef<HTMLDivElement>(null);
    const safetyDropdownRef = useRef<HTMLDivElement>(null);

    const [showMobileMenu, setShowMobileMenu] = useState(false);




    useEffect(() => {


        const handleClickOutside = (event: MouseEvent) => {
            if (
                productsDropdownRef.current &&
                !productsDropdownRef.current.contains(event.target as Node) &&
                safetyDropdownRef.current &&
                !safetyDropdownRef.current.contains(event.target as Node)

            ) {

                setOpenSection("");
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [openSection]);

    const onOpen = (id :string) => setOpenSection((prev) => prev == id ? "":id)

    const onClose = () => setOpenSection("")
    useEffect(() => {
        window.onresize = () => {
            setShowMobileMenu(false)
        }
    })
    return (
        <nav  className="absolute top-0 left-0 w-full z-50  ">
            {showMobileMenu && (
                <div className={"fixed w-screen h-[100vh] text-white  bg-gray-800 z-50 top slide-in-right "}>


                    <div className={"absolute m-8"}>
                        <Logo classNameParent={"absolute text-white"} classNameHeart={"text-red-600"}  />

                    </div>
                    <X onClick={() => {
                        setShowMobileMenu(false)
                    }}
                        className={"w-8 h-8 text-white absolute right-0 mt-10 mr-8 cursor-pointer "}></X>

                    <div className={"mt-20 flex flex-col gap-4 justify-center items-center"}>
                        <div ref={productsDropdownRef}>
                            <Dropdown
                                id={"product"}
                                titleName={"Products"}
                                openSection={openSection}
                                onOpen={onOpen}
                                onClose={onClose}
                            >
                                <div className="font-bold p-4 bg-white rounded-lg space-y-2 ">
                                    <button className=" rounded-lg block w-full text-left text-black hover:text-pink-300">Premium Features</button>
                                    <hr className="my-4 border-t border-gray-300" />
                                    <div className={"flex flex-row gap-2 items-center"}>

                                        <button className=" rounded-lg block w-full text-left text-black hover:text-pink-300">Subscription Tiers</button>
                                        <ChevronDown className={"w-4 h-4 text-black"}></ChevronDown>
                                    </div>

                                    <button className=" rounded-lg block w-full text-left text-black hover:text-pink-300 ml-6">Heartl Plus</button>
                                    <hr className="my-4 border-t border-gray-300" />

                                    <button className=" rounded-lg block w-full text-left text-black hover:text-pink-300 ml-6">Heartl Gold</button>
                                    <hr className="my-4 border-t border-gray-300" />

                                    <button className=" rounded-lg block w-full text-left text-black hover:text-pink-300 ml-6">Heartl Platinum</button>



                                </div>
                            </Dropdown>
                        </div>


                        <button key={"learn"}
                                onClick={() => {

                                }}
                                className={"hover:bg-white  hover:text-black rounded-lg p-4 hover:no-underline cursor-pointer font-bold transition-colors"} >
                            Learn
                        </button>

                        <div ref={safetyDropdownRef}>
                            <Dropdown
                                id={"safety"}
                                titleName={"Safety"}
                                openSection={openSection}
                                onOpen={onOpen}
                                onClose={onClose}

                            >
                                <div className="font-bold p-4 bg-white rounded-lg space-y-2 ">
                                    <button className=" rounded-lg block w-full text-left text-black hover:text-pink-300">Community Guidelines</button>
                                    <hr className="my-4 border-t border-gray-300" />
                                    <button className=" rounded-lg block w-full text-left text-black hover:text-pink-300">Safety Tips</button>
                                    <hr className="my-4 border-t border-gray-300" />
                                    <button className=" rounded-lg block w-full text-left text-black hover:text-pink-300">Safety and Policy</button>
                                    <hr className="my-4 border-t border-gray-300" />
                                    <button className=" rounded-lg block w-full text-left text-black hover:text-pink-300">Safety and reporting</button>
                                    <hr className="my-4 border-t border-gray-300" />
                                    <button className=" rounded-lg block w-full text-left text-black hover:text-pink-300">Security</button>

                                </div>
                            </Dropdown>
                        </div>

                        <button key={"support"}
                                onClick={() => {

                                }}
                                className={"hover:bg-white  hover:text-black rounded-lg p-4 hover:no-underline cursor-pointer font-bold transition-colors"} >
                            Support
                        </button>
                        <button key={"download"}
                                onClick={() => {

                                }}
                                className={"hover:bg-white  hover:text-black rounded-lg p-4 hover:no-underline cursor-pointer font-bold transition-colors"} >
                            Download
                        </button>

                    </div>
                    <div className={"flex flex-col bottom-0 gap-4 m-10 max-w-[400px] justify-center items-center mx-auto"}>

                        <button key={"language"}
                                onClick={() => {

                                }}
                                className={"w-full hover:bg-white  hover:text-black text-white rounded-xl  p-4 font-bold transition-colors"} >
                            Language
                        </button>
                        <button key={"login"}
                                onClick={() => {
                                    onAuth("login")
                                }}
                                className={" w-full bg-red-600 text-white hover:bg-red-500 transition-colors  text-lg   rounded-2xl px-8  p-2 font-bold "} >
                            Login
                        </button>

                    </div>

                </div>
            )}


            <div className={"flex flex-row gap-2 items-center"}>
                <Logo classNameHeart={"text-white ml-4"}  />
                <div className={"hidden lg:flex text-white  justify-center items-center"}>


                    <div ref={productsDropdownRef}>
                        <Dropdown
                            id={"product"}
                            titleName={"Products"}
                            openSection={openSection}
                            onOpen={onOpen}
                            onClose={onClose}
                        >
                            <div className="font-bold p-4 bg-white rounded-lg space-y-2 ">
                                <button className=" rounded-lg block w-full text-left text-black hover:text-pink-300">Premium Features</button>
                                <hr className="my-4 border-t border-gray-300" />
                                <div className={"flex flex-row gap-2 items-center"}>

                                    <button className=" rounded-lg block w-full text-left text-black hover:text-pink-300">Subscription Tiers</button>
                                    <ChevronDown className={"w-4 h-4 text-black"}></ChevronDown>
                                </div>

                                <button className=" rounded-lg block w-full text-left text-black hover:text-pink-300 ml-6">Heartl Plus</button>
                                <hr className="my-4 border-t border-gray-300" />

                                <button className=" rounded-lg block w-full text-left text-black hover:text-pink-300 ml-6">Heartl Gold</button>
                                <hr className="my-4 border-t border-gray-300" />

                                <button className=" rounded-lg block w-full text-left text-black hover:text-pink-300 ml-6">Heartl Platinum</button>



                            </div>
                        </Dropdown>
                    </div>


                    <button key={"learn"}
                            onClick={() => {

                            }}
                            className={"hover:bg-white  hover:text-black rounded-lg p-4 hover:no-underline cursor-pointer font-bold transition-colors"} >
                        Learn
                    </button>

                    <div ref={safetyDropdownRef}>
                        <Dropdown
                            id={"safety"}
                            titleName={"Safety"}
                            openSection={openSection}
                            onOpen={onOpen}
                            onClose={onClose}

                        >
                            <div className="font-bold p-4 bg-white rounded-lg space-y-2 ">
                                <button className=" rounded-lg block w-full text-left text-black hover:text-pink-300">Community Guidelines</button>
                                <hr className="my-4 border-t border-gray-300" />
                                <button className=" rounded-lg block w-full text-left text-black hover:text-pink-300">Safety Tips</button>
                                <hr className="my-4 border-t border-gray-300" />
                                <button className=" rounded-lg block w-full text-left text-black hover:text-pink-300">Safety and Policy</button>
                                <hr className="my-4 border-t border-gray-300" />
                                <button className=" rounded-lg block w-full text-left text-black hover:text-pink-300">Safety and reporting</button>
                                <hr className="my-4 border-t border-gray-300" />
                                <button className=" rounded-lg block w-full text-left text-black hover:text-pink-300">Security</button>

                            </div>
                        </Dropdown>
                    </div>

                    <button key={"support"}
                            onClick={() => {

                            }}
                            className={"hover:bg-white  hover:text-black rounded-lg p-4 hover:no-underline cursor-pointer font-bold transition-colors"} >
                        Support
                    </button>
                    <button key={"download"}
                            onClick={() => {

                            }}
                            className={"hover:bg-white  hover:text-black rounded-lg p-4 hover:no-underline cursor-pointer font-bold transition-colors"} >
                        Download
                    </button>
                </div>
                <div className={"ml-auto mr-8 mb-2"}>

                    <div className={"space-x-4 hidden lg:block"}>
                        <button key={"language"}
                                onClick={() => {

                                }}
                                className={"hover:bg-white  hover:text-black text-white rounded-xl  p-4 font-bold transition-colors"} >
                            Language
                        </button>
                        <button key={"login"}
                                onClick={() => {
                                    onAuth("login")
                                }}
                                className={"bg-white  text-lg text-black  rounded-2xl px-8  p-2 font-bold transition-colors"} >
                            Login
                        </button>
                    </div>


                    <div className={"lg:hidden"}>
                        <Menu onClick={() => {
                            setShowMobileMenu(true)
                        }}
                            className={"w-8 h-8 text-white cursor-pointer"}></Menu>

                    </div>

                </div>

            </div>










        </nav>
    )
}