interface Props{
    input: string;
    setInput: (input: string) => void;
    name: string;
    placeholder: string;
    type?: string;
    disabled?: boolean;
    className?: string;
}
export default function Input({name, placeholder, input, setInput, type="text", disabled=false, className=""} : Props) {

    return (
        <div className={"space-y-2 flex flex-col justify-center md:block md:text-left text-center" + className}>
            <p className={"w-full text-md text-white font-bold"}>{name}:</p>

            <input value={input}
                   onChange={(e) => setInput(e.target.value)}
                disabled={disabled}
                   type={type}
                className={"w-full rounded-md border-[1px] border-complementary bg-black p-2 "}
                   placeholder={placeholder}
            ></input>

        </div>
    )
}