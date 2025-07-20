import PopupModal from "../Elements/PopupModal.tsx";
import {Check} from "lucide-react"
interface Props{

    onClose: () => void;
}
export default function WelcomeModal({onClose} : Props) {
    return (
        <PopupModal showX={false}
            onClose={()=>{
            onClose()
        }} title="Welcome to Heartl"
        closeOnClick={false}>
            <div className={""}>

                {/*<div className={"w-full flex justify-center"}>*/}
                {/*    <Heart className={"w-6 h-6 text-red-600 fill-red-600"}></Heart>*/}
                {/*</div>*/}
                <p className={"text-gray-400 text-lg"}> Please follow these House Rules.</p>

                <div className={"w-full m-8 mx-auto space-y-6"}>

                    <div className={"relative flex flex-row gap-6 "}>
                        <div className={"relative w-fit top-1"}>
                            <Check className={"text-red-600 w-6 h-6"}></Check>
                        </div>
                        <div className={"w-full"}>
                            <h2 className={"text-xl text-white"}>Be Yourself.</h2>
                            <p className={"text-gray-400 text-md"}>Make sure your photos, age, and bio are true to who you are.</p>
                        </div>
                    </div>
                    <div className={"relative flex flex-row gap-6 "}>
                        <div className={"relative w-fit top-1"}>
                            <Check className={"text-red-600 w-6 h-6"}></Check>
                        </div>
                        <div className={"w-full"}>
                            <h2 className={"text-xl text-white"}>Stay Safe.</h2>
                            <p className={"text-gray-400 text-md"}>Don't be too quick to give out personal information. </p>
                        </div>
                    </div>
                    <div className={"relative flex flex-row gap-6 "}>
                        <div className={"relative w-fit top-1"}>
                            <Check className={"text-red-600 w-6 h-6"}></Check>
                        </div>
                        <div className={"w-full"}>
                            <h2 className={"text-xl text-white"}>Play it cool.</h2>
                            <p className={"text-gray-400 text-md"}>Respect others and treat them as you would like to be treated.</p>
                        </div>
                    </div>
                    <div className={"relative flex flex-row gap-6 "}>
                        <div className={"relative w-fit top-1"}>
                            <Check className={"text-red-600 w-6 h-6"}></Check>
                        </div>
                        <div className={"w-full"}>
                            <h2 className={"text-xl text-white"}>Be Proactive</h2>
                            <p className={"text-gray-400 text-md"}>Always report bad behavior.</p>
                        </div>
                    </div>
                </div>
                <button
                        onClick={() => {
                            onClose()
                        }}
                        className={"w-full text-white bg-red-600 hover:bg-red-800  transition-colors rounded-3xl p-4"}>
                    I agree
                </button>
            </div>
        </PopupModal>
    )
}