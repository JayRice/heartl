import PopupModal from "../Elements/PopupModal.tsx";
import {useState} from "react";
import {User} from "../../data/interfaces.ts"
import SaveButton from "../Elements/SaveButton.tsx";
type Intent = User["intent"];
interface Props{

    onClose: () => void;
    onSave: (intent: Intent) => void;
}


export default function IntentModal({onClose, onSave} : Props) {

    const [intent, setIntent] = useState<Intent | null>(null)

    const IntentCard = ({id, description} : {id: Intent, description:string}) => {

        const selectedClasses = intent == id ? "border-red-600":"border-complementary";
        return (
            <div onClick={() => {
                setIntent(id)
            }}
                 className={" cursor-pointer w-full bg-black h-[125px] text-center text-white  p-4 rounded-md overflow-clip border-2 " + selectedClasses}>
                <p className={"text-md"}>{description}</p>
            </div>
        )

    }
    return (
        <PopupModal onClose={()=>{
            if(!intent) { return;}
            onSave(intent);
            onClose()
        }} title="What are you looking for?" showX={false}
        titleClassName={"text-center"}>
            <div>

                <p className={"text-gray-400 text-lg mt-2"}> All good if it changes. There's something for everyone.</p>

                <div className={"flex flex-col gap-2 w-3/4 mx-auto mt-4"}>

                    <div className={"flex flex-row gap-2 "}>
                       <IntentCard id="long-term" description={"Long-term Partner"} />
                        <IntentCard id={"long-term-open-short"} description={"Long-term, Open to short"} />
                        <IntentCard id={"short-term-open-long"} description={"Short-term, open to long"} />
                    </div>
                    <div className={"flex flex-row gap-2 "}>
                        <IntentCard id={"short-term"} description={"Short-term fun"} />
                        <IntentCard id={"friends"} description={"New Friends"} />
                        <IntentCard id={"figuring-out"} description={"Still figuring it out"} />
                    </div>

                </div>

                <div className={"w-5/6 mx-auto"}>
                    <SaveButton className={"mt-4 "} isDisabled={intent === null}
                                onSave={() => {
                                    if(!intent) {return}
                                    onSave(intent)
                                    onClose()
                                }}></SaveButton>
                </div>


            </div>
        </PopupModal>
    )
}