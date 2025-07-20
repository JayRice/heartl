import PopupModal from "../Elements/PopupModal.tsx";
import {useState} from "react";
import {Interest, User} from "../../data/interfaces.ts"
import SaveButton from "../Elements/SaveButton.tsx";
type Interests = User["interests"];

import {interestsData} from "../../data/interestsData.ts"

interface Props{

    onClose: ()=>void;
    onSave: (interests: Interests) => void;
}
export default function InterestsModal({onClose, onSave} : Props) {
    const [interests, setInterests] = useState<Interest[]>([]);


    const InterestTag = ({id, name} : {id: Interest, name:string}) => {

        let selectedClasses = 'border-complementary text-gray-300'

        if (interests && interests?.includes(id) ){
            selectedClasses = "border-red-600 text-white";
        }

        return (
            <button onClick={() => {
                if(interests.length >= 5 && !interests.includes(id)){
                    return;
                }
                setInterests(() => {
                    if(interests.includes(id)){
                        return interests.filter((interest) => interest != id)
                    }
                    return [...interests, id]
                })
            }} className={" px-2 py-1 m-1 border-2 rounded-3xl  " + selectedClasses}>
                {name}
            </button>
        )
    }
    return (
        <PopupModal onClose={()=>{
            onClose()
        }} title="What are you into?" titleClassName={"text-xl text-center "}>
            <div>

                <p className={"text-gray mt-4 mb-4 text-center"}>
                    You like what you like. Now, let everyone know.
                </p>

                <div className={"h-80 hidden-scroll text-center py-10"}>
                    {
                        interestsData.map(({id, label}) => {

                            return (<InterestTag id={id} name={label} key={label}/>)

                        })
                    }
                </div>
                <div className={"w-5/6 mx-auto "}>
                    <SaveButton title={`Save (${interests.length}/5)`} className={"mt-4 "}
                                isDisabled={interests.length === 0 ||  !(interests.length >= 3 && interests.length <= 5) }
                                onSave={() => {
                                    if(!interests) {return}
                                    onSave(interests)
                                    onClose()
                                }}></SaveButton>
                </div>
            </div>
        </PopupModal>
    )
}