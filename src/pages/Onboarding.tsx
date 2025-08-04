import {Pencil, Plus, ChevronRight} from "lucide-react"
import {useNavigate} from "react-router-dom";
import {useEffect, useState, useRef} from "react";
import { User} from "../types/index.ts"

import {toast, Toaster} from "react-hot-toast"

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


import {handleLogin} from "../server/handleLogin.ts"
import save_images from "../database/save_images.ts"



import {User as FirebaseUser} from "firebase/auth"
import verifyImages from "../server/verifyImages.ts";
import LoadingSpinner from "../components/Elements/LoadingSpinner.tsx";
import useDatabaseStore from "../../store/databaseStore.ts";


export default function Onboarding({authUser} : {authUser: FirebaseUser}) {


    const navigate = useNavigate();



    const [DataUser, setDataUser] = useState<User>({
        id: authUser.uid,
        email: authUser.email,
        name: "j",
        birthday: ["09", "05", "2006"],
        gender: "male",
        interested_in: "women",
        intent: "long-term-open-short"
    } as User);

    const [images, setImages] = useState<(File | null)[]>([null, null, null, null, null, null]);
    const [currentImage, setCurrentImage] = useState<File | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);



    const [modalOpen, setModalOpen] = useState<null | "gender" | "welcome" | "intent" | "interests" | "image-edit">("welcome");


    const [disapprovedImages, setDisapprovedImages] = useState<string[]>([])

    const [isFetching, setIsFetching] = useState<boolean>(false)

    const [errorHandler, setErrorHandler] = useState<Partial<Record<"name" | "email" | "birthday", string>>>({});

    const setStoredDataUser = useDatabaseStore((state) => state.setUser)



    useEffect(() => {
        handleFormErrors("name");
    }, [DataUser.name]);

    useEffect(() => {
        handleFormErrors("email");
    }, [DataUser.email]);

    useEffect(() => {
        handleFormErrors("birthday");
    }, [DataUser.birthday.join("-")]);

    useEffect(() => {

    }, [errorHandler]);
    const handleFormErrors = (inputType: string) => {
        const newErrors = { ...errorHandler };

        const hasInvalidChars = (str: string, allowedRegex: RegExp) => !allowedRegex.test(str);

        if (inputType === "name") {
            const name = DataUser.name.trim();
            if (name.length < 3 || name.length > 20) {
                newErrors.name = "Name must be 3–20 characters.";
            } else if (hasInvalidChars(name, /^[a-zA-Z\s\-']+$/)) {
                newErrors.name = "Name contains invalid characters.";
            } else {
                delete newErrors.name;
            }

        } else if (inputType === "email") {
            const email = DataUser.email.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                newErrors.email = "Invalid email format.";
            } else if (hasInvalidChars(email, /^[a-zA-Z0-9@._\-+]+$/)) {
                newErrors.email = "Email contains invalid characters.";
            } else {
                delete newErrors.email;
            }

        } else if (inputType === "birthday") {

            const [month, day, year] = DataUser.birthday.map(Number);

            const birthDate = new Date(year, month - 1, day);
            console.log(birthDate)
            const ageDifMs = Date.now() - birthDate.getTime();
            const age = new Date(ageDifMs).getUTCFullYear() - 1970;

            console.log(age)

            const isValidDate = birthDate instanceof Date && !isNaN(birthDate.getTime());
            if (!isValidDate || age < 18 || age > 120 ) {
                newErrors.birthday = "Invalid or underage birthday.";
            } else {
                delete newErrors.birthday;
            }
        }


        console.log("NEw: ", newErrors)
        setErrorHandler(newErrors);
    };
    const is_valid_user_setup = (): boolean => {

        return (
            !!DataUser.name &&
            !!DataUser.email &&
            DataUser.birthday.length === 3 &&
            DataUser.birthday.every((part) => part.trim() !== "") &&
            !!DataUser.gender &&
            !!DataUser.intent &&
            !!DataUser.interested_in &&
            images.filter((img) => img !== null).length >= 2 &&
            images.filter((img) => {return (img && disapprovedImages.includes(img.name))} ).length === 0


        );
    }

    const handleOnboarding = async () => {
        if(is_valid_user_setup()){

            setIsFetching(true);


            let response = await handleLogin(DataUser)
            if (response.error){
                return toast("Login Error: ", response.error)
            }


            const docIds = await save_images(images.filter((image) => image != null));

            if (!docIds || docIds.length <= 0){
                return toast(`Could not save images - Please try again.`)
            }
            response = await verifyImages(docIds, DataUser);


            setIsFetching(false)

            if(response.error) {
                // handle error here and tell user to change images
                if (response.disapprovedImages){
                    setDisapprovedImages(response.disapprovedImages)

                    toast("Images could not be validated, this could be due to it being too explicit. Please switch the ones highlighted red.")
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                console.error(response.error)
            } else if (response.success){
                setStoredDataUser(DataUser)
                navigate("/app")
            }else{

                toast("Unknown Error - Please try again")
            }


        }


    }
    useEffect(() => {
        setCurrentImage(null)
        setCurrentImageIndex(null)

    }, [images]);

    const genderName = DataUser?.gender == "male" ? "Man": DataUser?.gender == "female" ? "Woman": "Non-Binary";
    if(!authUser){
        return navigate('/login')
    }

    const isContinueDisabled = !is_valid_user_setup() || Object.keys(errorHandler).length !== 0  || isFetching;

    return (

        <div className={"   "}>

            <Toaster position={"top-center"}></Toaster>

            {modalOpen==="gender" && <GenderModal onSave={(gender) => {
                setDataUser({...DataUser, gender: gender})
            }}
                onClose={() => setModalOpen(null)} />
            }
            {modalOpen==="welcome" && <WelcomeModal  onClose={() => {
                setModalOpen(null)
            }}/>
            }
            {modalOpen==="intent" && <IntentModal onSave={(intent) => {

                setDataUser({...DataUser, intent: intent })

            }} onClose={() => {
                setModalOpen(null)
            }}/>
            }
            {modalOpen==="interests" && <InterestsModal onSave={(interests) => {
                setDataUser({...DataUser, interests: interests})

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
                <Logo classNameParent={"absolute m-4 text-white"} classNameHeart={"text-red-600"}></Logo>

            </div>



            <div className={"p-2 bg-primary w-full h-full    "}>



                <div className={"mt-32"}>

                    <h1 className={"text-3xl text-white font-bold text-center mb-12"}> Create Account</h1>

                    <div className={"max-w-4xl w-full mx-auto"}>
                        <div className={"flex  justify-center w-full flex-col p-4 md:flex-row md:p-0  gap-8  text-white"}>


                            <div className={"w-full h-full space-y-8 flex flex-col justify-center text-center gap-4 md:block md:text-left "}>

                                <div>
                                    <Input name={"First Name"} placeholder={"ex. John"} input={DataUser.name} setInput={(input) => {
                                        setDataUser({...DataUser, name: input})
                                    }}  />
                                    {errorHandler.name && <p className={"absolute text-red-700 text-bold mt-2"}>{errorHandler.name}</p>}

                                </div>

                                <div>
                                    <Input name={"Email"} disabled={authUser.email != null} type={"email"} placeholder={"example@example.com"} input={DataUser.email} setInput={(input) => {
                                        setDataUser({...DataUser, email: input})
                                    }} className={"mt-4"} />
                                    {errorHandler.email && <p className={"absolute text-red-700 text-bold mt-2"}>{errorHandler.email}</p>}

                                </div>


                                <div className={"w-full flex justify-center"}>
                                    <div className={"space-y-2"}>
                                        <p className={"text-md text-white font-bold w-full"}>Birthday:</p>

                                        <DateInput date={DataUser.birthday} setDate={(date) => {
                                            setDataUser({...DataUser, birthday: date})
                                        }} />

                                    </div>
                                    {errorHandler.birthday && <p className={"absolute text-red-700 text-bold mt-28"}>{errorHandler.birthday}</p>}
                                </div>


                                <div className={"space-y-2 "}>
                                    <p className={"text-md text-white font-bold"}>Gender:</p>

                                    <Button onClick={() => {
                                        setModalOpen("gender")
                                    }} className={"inline-block "}>
                                        <div className={"flex flex-row gap-2 items-center"}>
                                            {DataUser.gender ? <Pencil className={"w-4 h-4 text-white"}/> :  <Plus className={"w-4 h-4 text-white"}/>}

                                            <p className={"text-sm"}> {DataUser.gender === null ? "Add":"Edit"} Gender</p>
                                            {DataUser.gender !== null && (
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
                                            isSelected={DataUser.interested_in == "men"}
                                            onClick={() => {
                                                setDataUser({...DataUser, interested_in: "men"})
                                            }}>
                                            <p className={"text-lg font-bold text-white"}>Men</p>
                                        </Button>
                                        <Button
                                            className={"w-full h-full text-center"}
                                            isSelected={DataUser.interested_in === "women"}

                                            onClick={() => {
                                                setDataUser({...DataUser, interested_in: "women"})
                                            }}>
                                            <p className={"text-lg font-bold text-white"}>Women</p>

                                        </Button>
                                        <Button
                                            className={"w-full h-full text-center"}
                                            isSelected={DataUser.interested_in == "everyone"}

                                            onClick={() => {
                                                setDataUser({...DataUser, interested_in: "everyone"})
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
                                            {DataUser.intent ? <Pencil className={"w-4 h-4 text-white"}/> :  <Plus className={"w-4 h-4 text-white"}/>}

                                            <p className={"text-sm"}> {DataUser.intent === null ? "Add":"Edit"} Relationship Intent</p>


                                        </div>
                                    </Button>
                                </div>



                            </div>

                            <div className={"w-full h-full px-8"}>
                                <p className={"text-md text-white font-bold"}>Profile Photos</p>

                                <div className={"mt-4 z-0"}>
                                    <PhotoCards images={images}
                                                disapprovedImages={disapprovedImages}
                                                setDisapprovedImages={setDisapprovedImages}

                                                onDelete={(index) => {
                                                    setImages((prev) => {
                                                        if ( index < 0 || index >= prev.length) return prev;

                                                        const newImages = [...prev]
                                                        newImages[index] = null;
                                                        return newImages;
                                                    })
                                                }}

                                                onUpload={(file, index) => {
                                                    setCurrentImageIndex(index);
                                                    setCurrentImage(file);
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
                                        {DataUser.interests ? <Pencil className={"w-4 h-4 text-white"}/> :  <Plus className={"w-4 h-4 text-white"}/>}

                                        <p className={"text-sm"}> {DataUser.interests === null ? "Add":"Edit"} Interests</p>



                                    </div>
                                </Button>
                                <div className={"w-3/4 mx-auto md:w-64 md:mx-0"}>
                                    {DataUser.interests && (
                                        DataUser.interests.map((interest) => (
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



                                await handleOnboarding()


                            }}


                            disabled={isContinueDisabled} >
                        {isFetching ?
                            <LoadingSpinner />:<p className={`w-full text-center px-2 py-1`}> Continue </p>

                        }
                    </Button>
                </div>

            </div>


        </div>

    )

}