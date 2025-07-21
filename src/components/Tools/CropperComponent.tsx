import Cropper from "react-easy-crop";
import {RotateCw} from "lucide-react"
import { useState, useCallback,  useImperativeHandle, forwardRef} from "react";

function getEditedImage(
    imageSrc: string,
    crop: { x: number; y: number; width: number; height: number },
    fileName: string,
    rotation: number = 0
): Promise<File> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.src = imageSrc;

        image.onload = () => {
            const radians = (rotation * Math.PI) / 180;

            // Create a canvas large enough to hold the rotated image
            const maxDim = Math.max(image.width, image.height);
            const safeArea = Math.ceil(maxDim * Math.SQRT2)

            const canvas = document.createElement("canvas");
            canvas.width = safeArea;
            canvas.height = safeArea;
            const ctx = canvas.getContext("2d");

            if (!ctx) return reject(new Error("Canvas not supported"));

            // Rotate the image onto the canvas



            // Fix this later...
            if (rotation != 0){

                ctx.rotate((rotation * Math.PI) / 180);
                ctx.translate(-image.width / 2, -image.height / 2);
                const offset = safeArea / 2;

                const offsetX = Math.cos(radians) * offset;
                const offsetY = Math.sin(radians) * offset;
                ctx.translate(-offsetX, -offsetY);

            }
            ctx.drawImage(image, 0, 0);


            // Now crop the rotated image onto a new canvas
            const croppedCanvas = document.createElement("canvas");
            croppedCanvas.width = crop.width;
            croppedCanvas.height = crop.height;
            const croppedCtx = croppedCanvas.getContext("2d");

            if (!croppedCtx) return reject(new Error("Cropped canvas context missing"));

            croppedCtx.drawImage(
                canvas,
                crop.x,
                crop.y,
                crop.width,
                crop.height,
                0,
                0,
                crop.width,
                crop.height
            );

            croppedCanvas.toBlob((blob) => {
                if (!blob) return reject(new Error("Crop failed"));
                resolve(new File([blob], fileName, { type: "image/jpeg" }));
            }, "image/jpeg");
        };

        image.onerror = reject;
    });
}

type CropperComponentProps = {
    file: File;
    onDone: (editedImage: File) => void;
};

export type CropperComponentRef = {
    save: () => Promise<File | null>;
};

const CropperComponent = forwardRef<CropperComponentRef, CropperComponentProps>(
    function CropperComponent({ file, onDone }, ref) {
        const [imageUrl] = useState(URL.createObjectURL(file));
        const [crop, setCrop] = useState({ x: 0, y: 0 });
        const [zoom, setZoom] = useState(1);
        const [rotation, setRotation] = useState(0);
        const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

        const onCropComplete = useCallback((_: any, areaPixels: any) => {
            setCroppedAreaPixels(areaPixels);
        }, []);

        useImperativeHandle(ref, () => ({
            async save() {
                console.log("Saving")
                if (!croppedAreaPixels) return null;
                return await getEditedImage(
                    imageUrl,
                    croppedAreaPixels,
                    file.name,
                    rotation
                );

            },
        }));

        return (
            <div className="relative w-[300px] h-[400px] bg-black">
                <Cropper
                    image={imageUrl}
                    crop={crop}
                    zoom={zoom}
                    aspect={3 / 4}
                    rotation={rotation}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                />
                <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                    <div className="flex flex-row justify-around gap-2 items-center w-full">
                        <input
                            className="w-full accent-red-600 h-[4px]"
                            type="range"
                            min={1}
                            max={3}
                            step={0.1}
                            value={zoom}
                            onChange={(e) => setZoom(Number(e.target.value))}
                        />

                        <div
                            onClick={() =>
                                setRotation((prev) => (prev === 270 ? 0 : prev + 90))
                            }
                            className="cursor-pointer h-full"
                        >
                            <RotateCw className="text-white w-6 h-6" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

export default CropperComponent;