import PopupModal from "../Elements/PopupModal.tsx";
import SaveButton from "../Elements/SaveButton.tsx"
import CropperComponent from "../Tools/CropperComponent.tsx";
import {useState, useRef} from "react";
interface Props{

    image: File,
    onClose: () => void;
    onSave: (edited_image : File) => void;
}



export default function ImageEditModal({image,  onClose, onSave} : Props) {

    const cropperRef = useRef<{ save: () => Promise<File | null> }>(null);
    const handleSave = async () => {
        const editedImage = await cropperRef.current?.save();
        console.log("Edited image returned:", editedImage);

        if (editedImage) {
            onSave(editedImage);
        }
    };
    return (
        <PopupModal showX={false}
                    onClose={()=>{
                        onClose()
                    }} title="Adjust Photo"
        titleClassName={"w-full text-center text-xl"}>

            <div>



                <div className={"my-4"}>
                    <CropperComponent  ref={cropperRef}  file={image} onDone={(editedImage) => {
                        console.log(editedImage, " DOne ")

                        onSave(editedImage)

                    }} ></CropperComponent>
                </div>

                <SaveButton isDisabled={false} title={"Save"} onSave={() => {
                    handleSave()
                }}/>
            </div>

        </PopupModal>


        )
}