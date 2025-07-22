import {Heart} from "lucide-react";
import {useNavigate} from "react-router-dom";

interface Props {
    classNameParent?: string,
    classNameHeart?: string,
    classNameText?: string

}

export default function Logo({classNameParent="", classNameHeart="", classNameText=""}: Props) {

    const navigate = useNavigate();
    console.log(classNameHeart)
    return (
        <div onClick={() => {
            navigate("/")
            window.location.reload();
        }} className={"flex flex-row gap-0 items-center justify-center cursor-pointer select-none " + classNameParent}>
            <Heart className={"w-12 h-12 fill-current  " + classNameHeart}></Heart>
            <h1 className={"text-4xl  font-bold " + classNameText}>Heartl</h1>
        </div>
    )
}