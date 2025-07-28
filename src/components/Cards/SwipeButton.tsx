import {ReactNode} from "react";
interface Props {
    onClick: () => void;
    children: ReactNode;
    disabled?: boolean;
    className: string;
    style?: React.CSSProperties;

}

export default function SwipeButton({onClick,children, disabled=false, className, style } : Props){



    return (<div style={style}  className={"relative flex justify-center items-center rounded-full p-3 bg-[#21252E] transition  " + className + " " + (disabled ? "" : "hover:scale-110")}>
        <div className={"w-full h-full flex justify-center items-center " + (disabled ? "text-gray-600 opacity-40":"")}>
            {children}
        </div>

        <button disabled={disabled} onClick={onClick} className={"w-full h-full absolute"}></button>
    </div>)
}