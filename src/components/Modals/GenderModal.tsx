import PopupModal from "../Elements/PopupModal.tsx";
import Button from "../Elements/Button.tsx";
import {useState} from "react";
import {User} from "../../data/interfaces.ts"
type Gender = User["gender"];



interface Props{

    onClose: () => void;
    onSave: (gender: Gender) => void;
}
export default function GenderModal({onClose, onSave} : Props) {
    const [gender, setGender] = useState<Gender | null>(null);

    return (
        <PopupModal  onClose={()=>{
            onClose()
        }} title="What's your Gender?" >

            <div className={"mt-2"}>

                <p className={"text-gray-300"}>
                    Select all that describe you to help us show your profile to the right people. You can add more details if you’d like.
                </p>
                <div className={"my-8 space-y-4 font-bold mb-12 "}>
                    <Button
                    isSelected={gender==="male"}
                        onClick={() => {
                        setGender((prev => prev == "male" ? null:"male"))
                    }}>
                        <p>
                            Man
                        </p>
                    </Button>
                    <Button
                        isSelected={gender==="female"}
                        onClick={() => {
                            setGender((prev => prev == "female" ? null:"female"))
                        }}>
                        <p>
                            Woman
                        </p>
                    </Button>
                    <Button
                        isSelected={gender==="non-binary"}
                        onClick={() => {
                            setGender((prev => prev == "non-binary" ? null:"non-binary"))
                        }}>
                        <p>
                            Non-Binary
                        </p>
                    </Button>
                </div>

                <div className={"flex justify-center px-8 flex-col border-t-[1px]  border-complementary "}>
                    <div className={"flex flex-row justify-center gap-2 items-center p-2 m-2"}>
                        {/* Fix the color of this checkbox later */}
                        <input type={"checkbox"} className={" w-4 h-4 accent-red-600   border-2 border-complementary"}></input>
                        <p className={"text-lg"}>Show your gender on your profile</p>

                    </div>

                    <button disabled={gender===null}
                        onClick={() => {
                        if(!gender) {return}
                        onSave(gender);
                        onClose()
                    }}
                        className={"w-full text-white bg-red-600 hover:bg-red-800  transition-colors rounded-3xl p-4"}>
                        Save
                    </button>
                </div>



            </div>
        </PopupModal>
    )
}