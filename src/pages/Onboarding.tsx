import {Pencil, Plus, ChevronRight} from "lucide-react"
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import { User} from "../data/interfaces.ts"


import Button from "../components/Elements/Button.tsx"
import Logo from "../components/Elements/Logo.tsx"
import Input from "../components/Elements/Input.tsx"
import DateInput from "../components/Elements/DateInput.tsx"
import GenderModal from "../components/Modals/GenderModal.tsx";
import WelcomeModal from "../components/Modals/WelcomeModal.tsx";
import IntentModal from "../components/Modals/IntentModal.tsx";
import InterestsModal from "../components/Modals/InterestsModal.tsx";
import PhotoCards from "../components/Elements/PhotoCards.tsx";
import ImageEditModal from "../components/Modals/ImageEditModal.tsx"

import {verify_user} from "../server/auth.tsx"

interface Props {
    email: string,
    phone: string,
}
export default function Onboarding({email, phone}: Props) {

    const navigate = useNavigate();

    const [User, setUser] = useState<User>({
        email: email,
        phone: phone,
        name: "",
        birthday: ["", "", ""],
        gender: null,
        interested_in: null,
        intent: null
    } as User);

    const [images, setImages] = useState<(File | null)[]>([null, null, null, null, null, null]);
    const [currentImage, setCurrentImage] = useState<File | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);



    const [modalOpen, setModalOpen] = useState<null | "gender" | "welcome" | "intent" | "interests" | "image-edit">("welcome");



    const valid_user_setup = (): boolean => {
        console.log(User)
        return (
            !!User.name &&
            !!User.email &&
            User.birthday.length === 3 &&
            User.birthday.every((part) => part.trim() !== "") &&
            !!User.gender &&
            !!User.intent &&
            !!User.interested_in &&
            images.filter((img) => img !== null).length >= 2
        );
    }
    useEffect(() => {
        console.log("IMAGES DETECTED CHANGE")
        setCurrentImage(null)
        setCurrentImageIndex(null)

        console.log(images)
    }, [images]);

    const genderName = User?.gender == "male" ? "Man": User?.gender == "female" ? "Woman": "Non-Binary";
    return (

        <div className={"   "}>
            {modalOpen==="gender" && <GenderModal onSave={(gender) => {
                setUser({...User, gender: gender})
            }}
                onClose={() => setModalOpen(null)} />
            }
            {modalOpen==="welcome" && <WelcomeModal  onClose={() => {
                setModalOpen(null)
            }}/>
            }
            {modalOpen==="intent" && <IntentModal onSave={(intent) => {

                setUser({...User, intent: intent })

            }} onClose={() => {
                setModalOpen(null)
            }}/>
            }
            {modalOpen==="interests" && <InterestsModal onSave={(interests) => {
                setUser({...User, interests: interests})

            }} onClose={() => {
                setModalOpen(null)
            }}/>
            }

            {(modalOpen=="image-edit" && currentImage && (currentImageIndex) !== null) && <ImageEditModal image={currentImage} onClose={() => {
                setModalOpen(null)
            }
            } onSave={(edited_image) => {

                setImages((prev) => {
                    if (prev.length > currentImageIndex) {
                        const newImages = [...prev];
                        newImages[currentImageIndex] = edited_image;
                        return newImages;
                    }
                    return prev;
                })

            }
            } />}


            <div className={"fixed w-full h-20 bg-primary border-b-[1px] border-complementary z-40"}>
                <Logo classNameParent={"absolute m-4"} classNameHeart={"text-red-600"}></Logo>

            </div>



            <div className={"p-2 bg-primary w-full h-full    "}>



                <div className={"mt-32"}>

                    <h1 className={"text-3xl text-white font-bold text-center mb-12"}> Create Account</h1>

                    <div className={"max-w-4xl w-full mx-auto"}>
                        <div className={"flex  justify-center w-full flex-col p-4 md:flex-row md:p-0  gap-8  text-white"}>


                            <div className={"w-full h-full space-y-4 flex flex-col justify-center text-center gap-4 md:block md:text-left "}>

                                <Input name={"First Name"} placeholder={"ex. John"} input={User.name} setInput={(input) => setUser({...User, name: input})}  />

                                <Input name={"Email"} type={"email"} placeholder={"example@example.com"} input={User.email} setInput={(input) => setUser({...User, email: input})} className={"mt-4"} />


                                <div className={"space-y-2"}>
                                    <p className={"text-md text-white font-bold w-full"}>Birthday:</p>

                                    <DateInput date={User.birthday} setDate={(date) => setUser({...User, birthday: date})} />

                                </div>

                                <div className={"space-y-2 "}>
                                    <p className={"text-md text-white font-bold"}>Gender:</p>

                                    <Button onClick={() => {
                                        setModalOpen("gender")
                                    }} className={"inline-block "}>
                                        <div className={"flex flex-row gap-2 items-center"}>
                                            {User.gender ? <Pencil className={"w-4 h-4 text-white"}/> :  <Plus className={"w-4 h-4 text-white"}/>}

                                            <p className={"text-sm"}> {User.gender === null ? "Add":"Edit"} Gender</p>
                                            {User.gender !== null && (
                                                <div className={"flex flex-row gap-2 items-center"}>
                                                    <ChevronRight className={"w-4 h-4 text-white"}></ChevronRight>
                                                    <p>{genderName}</p>
                                                </div>
                                            )}

                                        </div>
                                    </Button>
                                </div>


                                <div className={"space-y-2"}>
                                    <p className={"text-md text-white font-bold"}>Interested In:</p>
                                    <div className={"w-full h-full flex flex-row gap-2 items-center justify-center"}>

                                        <Button
                                            className={"w-full h-full text-center"}
                                            isSelected={User.interested_in == "men"}
                                            onClick={() => {
                                                setUser({...User, interested_in: "men"})
                                            }}>
                                            <p className={"text-lg font-bold text-white"}>Men</p>
                                        </Button>
                                        <Button
                                            className={"w-full h-full text-center"}
                                            isSelected={User.interested_in === "women"}

                                            onClick={() => {
                                                setUser({...User, interested_in: "women"})
                                            }}>
                                            <p className={"text-lg font-bold text-white"}>Women</p>

                                        </Button>
                                        <Button
                                            className={"w-full h-full text-center"}
                                            isSelected={User.interested_in == "everyone"}

                                            onClick={() => {
                                                setUser({...User, interested_in: "everyone"})
                                            }}>
                                            <p className={"text-lg font-bold text-white"}>Everyone</p>
                                        </Button>
                                    </div>
                                </div>


                                <div className={"space-y-2"}>
                                    <p className={"text-md text-white font-bold"}>Looking For</p>
                                    <Button onClick={() => {
                                        setModalOpen("intent")
                                    }} className={"inline-block "}>
                                        <div className={"flex flex-row gap-2 items-center"}>
                                            {User.intent ? <Pencil className={"w-4 h-4 text-white"}/> :  <Plus className={"w-4 h-4 text-white"}/>}

                                            <p className={"text-sm"}> {User.intent === null ? "Add":"Edit"} Relationship Intent</p>


                                        </div>
                                    </Button>
                                </div>



                            </div>

                            <div className={"w-full h-full px-8"}>
                                <p className={"text-md text-white font-bold"}>Profile Photos</p>

                                <div className={"mt-4 z-0"}>
                                    <PhotoCards images={images}
                                                onDelete={(index) => {
                                                    console.log("DELETING IN ONBOARING")
                                                    setImages((prev) => {
                                                        console.log("INDEX in onboarding:", index)
                                                        if ( index < 0 || index >= prev.length) return prev;

                                                        const newImages = [...prev]
                                                        newImages[index] = null;
                                                        return newImages;
                                                    })
                                                }}

                                                onUpload={(file, index) => {


                                        setCurrentImageIndex(index);
                                        setCurrentImage(file);
                                        console.log("Set modal open!")
                                        setModalOpen("image-edit");
                                    }}></PhotoCards>
                                </div>
                                <div className={"mt-4 text-center"}>
                                    <p className={"text-md text-gray-400"}>Upload 2 photos to start. Add 4 or more to make your profile stand out.</p>
                                </div>
                            </div>
                        </div>


                        <div className={"relative mt-16 mb-8 border-[1px] border-complementary w-full flex justify-center"}>
                            <p className={"absolute text-white text-lg p-4 bg-primary top-[-2rem]  "}>Optional</p>
                        </div>
                        {/* Optional */}
                        <div className={"flex flex-row justify-center  gap-8  text-white"}>
                            <div className={"flex justify-center w-full flex-col p-4 text-center space-y-2 md:block  md:text-left md:p-0"}>
                                <p className={"text-md text-white font-bold"}>Interests</p>
                                <Button onClick={() => {
                                    setModalOpen("interests")
                                }} className={"h-fit w-fit mx-auto md:mx-0 "}>
                                    <div className={"flex flex-row gap-2 items-center "}>
                                        {User.interests ? <Pencil className={"w-4 h-4 text-white"}/> :  <Plus className={"w-4 h-4 text-white"}/>}

                                        <p className={"text-sm"}> {User.interests === null ? "Add":"Edit"} Interests</p>



                                    </div>
                                </Button>
                                <div className={"w-3/4 mx-auto md:w-64 md:mx-0"}>
                                    {User.interests && (
                                        User.interests.map((interest) => (
                                            <p className={"inline-block w-fit text-white px-2 py-1 m-1 border-2 rounded-3xl border-red-600 "}>
                                                {interest}
                                            </p>
                                        ))
                                    )}
                                </div>


                            </div>
                        </div>
                    </div>



                </div>


                <div className={"w-64 mx-auto"}>
                    <Button className={"mt-32 mb-16"}
                            onClick={async () => {
                                if(valid_user_setup()){

                                    // Backend
                                    const verified_response : boolean = await verify_user(User);

                                    if(verified_response){
                                        navigate("/app")
                                    }



                                }
                            }}


                            disabled={!valid_user_setup()} >
                        <p className={"w-full text-center px-2 py-1"}> Continue </p>
                    </Button>
                </div>

            </div>


        </div>

    )

}