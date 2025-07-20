import {Pencil, Plus, ChevronRight} from "lucide-react"
import {useState} from "react";
import {User} from "../data/interfaces.ts"
type Gender = User["gender"];
type Intent = User["intent"];
type Interested = User["interests"];

import Button from "../components/Elements/Button.tsx"
import Logo from "../components/Elements/Logo.tsx"
import Input from "../components/Elements/Input.tsx"
import DateInput from "../components/Elements/DateInput.tsx"
import GenderModal from "../components/Modals/GenderModal.tsx";
import WelcomeModal from "../components/Modals/WelcomeModal.tsx";
import IntentModal from "../components/Modals/IntentModal.tsx";
import InterestsModal from "../components/Modals/InterestsModal.tsx";
export default function Onboarding() {


    const [User, setUser] = useState<User | null>(null);

    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState<[string ,string, string]>(["","",""]);
    const [gender, setGender] = useState<Gender | null>(null);
    const [interested_in, setInterested_in] = useState<Interested | null>(null);
    const [intent, setIntent] = useState<Intent | null>(null);
    const [interests, setInterests] = useState<Interested | null>(null);



    const [modalOpen, setModalOpen] = useState<null | "gender" | "welcome" | "intent" | "interests">("welcome");

    const genderName = gender == "male" ? "Man": gender == "female" ? "Woman": "Non-Binary";
    return (

        <div className={"   "}>
            {modalOpen==="gender" && <GenderModal onSave={(gender) => {
                setGender(gender)
            }}
                onClose={() => setModalOpen(null)} />
            }
            {modalOpen==="welcome" && <WelcomeModal  onClose={() => {
                setModalOpen(null)
            }}/>
            }
            {modalOpen==="intent" && <IntentModal onSave={(intent) => {

                setIntent(intent)
            }} onClose={() => {
                setModalOpen(null)
            }}/>
            }
            {modalOpen==="interests" && <InterestsModal onSave={(interests) => {
                setInterests(interests)
            }} onClose={() => {
                setModalOpen(null)
            }}/>
            }


            <div className={"fixed w-full h-20 bg-primary border-b-[1px] border-complementary"}>
                <Logo classNameParent={"absolute m-4"} classNameHeart={"text-red-600"}></Logo>

            </div>



            <div className={"p-2 bg-primary w-full h-full    "}>



                <div className={"mt-32"}>

                    <h1 className={"text-3xl text-white font-bold text-center mb-12"}> Create Account</h1>

                    <div className={"max-w-4xl w-full mx-auto"}>
                        <div className={"flex flex-row justify-center  gap-8  text-white"}>


                            <div className={"w-full h-full space-y-4"}>

                                <Input name={"First Name"} placeholder={"ex. John"} input={firstName} setInput={setFirstName}  />

                                <Input name={"Email"} type={"email"} placeholder={"example@example.com"} input={email} setInput={setEmail} className={"mt-4"} />


                                <p className={"text-md text-white font-bold"}>Birthday:</p>

                                <DateInput date={date} setDate={setDate}/>

                                <p className={"text-md text-white font-bold"}>Gender:</p>

                                <Button onClick={() => {
                                    setModalOpen("gender")
                                }} className={"inline-block "}>
                                    <div className={"flex flex-row gap-2 items-center"}>
                                        {gender ? <Pencil className={"w-4 h-4 text-white"}/> :  <Plus className={"w-4 h-4 text-white"}/>}

                                        <p className={"text-sm"}> {gender === null ? "Add":"Edit"} Gender</p>
                                        {gender !== null && (
                                            <div className={"flex flex-row gap-2 items-center"}>
                                                <ChevronRight className={"w-4 h-4 text-white"}></ChevronRight>
                                                <p>{genderName}</p>
                                            </div>
                                        )}

                                    </div>
                                </Button>

                                <p className={"text-md text-white font-bold"}>Interested In:</p>
                                <div className={"w-full h-full flex flex-row gap-2 items-center justify-center"}>

                                    <Button
                                        className={"w-full h-full text-center"}
                                        isSelected={interested_in == "men"}
                                        onClick={() => {
                                            setInterested_in("men")
                                        }}>
                                        <p className={"text-lg font-bold text-white"}>Men</p>
                                    </Button>
                                    <Button
                                        className={"w-full h-full text-center"}
                                        isSelected={interested_in === ""}

                                        onClick={() => {
                                            setInterested_in("women")
                                        }}>
                                        <p className={"text-lg font-bold text-white"}>Women</p>

                                    </Button>
                                    <Button
                                        className={"w-full h-full text-center"}
                                        isSelected={interested_in == "everyone"}

                                        onClick={() => {
                                            setInterested_in("everyone")
                                        }}>
                                        <p className={"text-lg font-bold text-white"}>Everyone</p>
                                    </Button>
                                </div>

                                <p className={"text-md text-white font-bold"}>Looking For</p>
                                <Button onClick={() => {
                                    setModalOpen("intent")
                                }} className={"inline-block "}>
                                    <div className={"flex flex-row gap-2 items-center"}>
                                        {intent ? <Pencil className={"w-4 h-4 text-white"}/> :  <Plus className={"w-4 h-4 text-white"}/>}

                                        <p className={"text-sm"}> {intent === null ? "Add":"Edit"} Relationship Intent</p>


                                    </div>
                                </Button>





                            </div>

                            <div className={"w-full h-full"}>
                                Two
                            </div>
                        </div>


                        <div className={"relative mt-16 mb-8 border-[1px] border-complementary w-full flex justify-center"}>
                            <p className={"absolute text-white text-lg p-4 bg-primary top-[-2rem]  "}>Optional</p>
                        </div>
                        {/* Optional */}
                        <div className={"flex flex-row justify-center  gap-8  text-white"}>
                            <div className={"w-full h-full space-y-4"}>
                                <p className={"text-md text-white font-bold"}>Interests</p>
                                <Button onClick={() => {
                                    setModalOpen("interests")
                                }} className={"inline-block "}>
                                    <div className={"flex flex-row gap-2 items-center"}>
                                        {interests ? <Pencil className={"w-4 h-4 text-white"}/> :  <Plus className={"w-4 h-4 text-white"}/>}

                                        <p className={"text-sm"}> {interests === null ? "Add":"Edit"} Interests</p>


                                    </div>
                                </Button>

                            </div>
                        </div>
                    </div>



                </div>


                <div className={"w-64 mx-auto"}>
                    <Button className={"mt-32"} onClick={() => {}}

                            disabled={true} name={"Continue"}></Button>
                </div>

            </div>


        </div>

    )

}