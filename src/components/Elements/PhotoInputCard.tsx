import {Plus, X} from "lucide-react"
import {useRef, useState,useEffect} from "react";
interface Props {
 index: number;
 onChange: (file?: File ) => void;
 onDelete: (index: number) => void;
 image: File | null;
 className?: string;
}

export default function PhotoInputCard({index, onChange, onDelete, image, className=""} : Props){
    const fileRef = useRef<HTMLInputElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const uploadedClasses = isFileUploaded ? "cursor-grab":"cursor-pointer"

    useEffect(() => {
        if(image && imgRef.current){
            imgRef.current.src = URL.createObjectURL(image)

        }
    })
    return (
        <div className={"relative"}>

            <div onClick={() => {
                fileRef.current?.click()
            }}
                 title={fileRef.current?.name}
                 className={`w-full h-[150px] relative bg-primary border-complementary border-dashed border-4 box-border z-0  ${uploadedClasses} ${className}`}>

                <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file || !imgRef.current) return
                        setIsFileUploaded(true)

                        e.target.value = "";

                        onChange(file);


                    }}
                    className="hidden"
                />

                <img ref={imgRef}  className={"w-full h-full object-cover " + (isFileUploaded ? "block":"hidden")}></img>




            </div>

            <div onClick={() => {
                if(!isFileUploaded || !imgRef.current){return}

                setIsFileUploaded(false)

                imgRef.current.src = ""

                onDelete(index)
            }}
                 className={"cursor-pointer z-10 absolute bottom-[-.25rem] right-[-.25rem] border-[1px] border-white bg-red-600 rounded-full w-6 h-6 flex items-center justify-center"}>



                {
                    isFileUploaded ?
                        <X className={"w-full h-full"}/> : <Plus className={"w-full h-full"}/>
                }

            </div>
        </div>

    )
}