import PhotoInputCard from "./PhotoInputCard.tsx";

import {sanitize} from "../../logic/constants.ts"

interface Props {
    onUpload: (file : File, index: number) => void,
    onDelete: (index: number) => void,
    images: (File | null)[],
    disapprovedImages : string[],
    setDisapprovedImages: (disapprovedImages : string[]) => void,

}
export default function PhotoCards({onUpload,onDelete, images, disapprovedImages, setDisapprovedImages} : Props) {
    const onChangeFile= (file: File, index: number) => {
        onUpload(file, index);
    }
    const onDeleteFile= (index: number) => {
        onDelete(index)
    }
    return (
        <div className={"grid grid-cols-3 grid-rows-2 gap-2 p-0 z-0"}>

            {
                images.map((image, i) => {
                   return <PhotoInputCard className={`${image ? (disapprovedImages.includes(sanitize(image.name)) ? "flashing-red-border":"") : "" }`} image={image} index={i} key={i} onDelete={onDeleteFile} onChange={(file) =>
                   {
                       if(!file) return;
                       onChangeFile(file, i)
                       // If images were flagged as NSFW and you change them then they'll be unflagged
                       if (!image) return;
                       setDisapprovedImages(disapprovedImages.filter((imgName) => imgName !== file.name))
                   }} />
                })
            }


        </div>
    )
}