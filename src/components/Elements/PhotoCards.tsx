import PhotoInputCard from "./PhotoInputCard.tsx";

interface Props {
    onUpload: (file : File, index: number) => void,
    onDelete: (index: number) => void,
    images: (File | null)[]
}
export default function PhotoCards({onUpload,onDelete, images} : Props) {
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
                   return <PhotoInputCard image={image} index={i} key={i} onDelete={onDeleteFile} onChange={(file) => onChangeFile(file, i)} />
                })
            }


        </div>
    )
}