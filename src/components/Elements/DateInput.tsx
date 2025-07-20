import { useRef } from "react";

interface Props {
    date: [string ,string , string];
    setDate: (date: [string ,string , string]) => void;
}
export default function DateInput({date, setDate}: Props): JSX.Element {

    const dayRef = useRef<HTMLInputElement>(null);
    const monthRef = useRef<HTMLInputElement>(null);
    const yearRef = useRef<HTMLInputElement>(null);

    return (
        <div className={"max-w-md w-full flex flex-row gap-2"}>
            <div className={"flex flex-col"}>
                <label>Day</label>
                <input
                    ref={dayRef}
                    value={date[0]}
                    maxLength={2}
                    onChange={(e) => {
                        const value = e.target.value.slice(0, 2);
                        setDate([value, date[1], date[2]]);
                        if (value.length === 2) {
                            monthRef.current?.focus();
                        }
                    }}
                    className={"rounded-md border-2 border-complementary bg-black p-2 w-16 "}
                    placeholder={"DD"}
                />
            </div>

            <div className={"flex flex-col"}>
                <label>Month</label>
                <input
                    ref={monthRef}
                    value={date[1]}
                    maxLength={2}
                    onChange={(e) => {
                        const value = e.target.value.slice(0, 2);
                        setDate([date[0], value, date[2]]);
                        if (value.length === 2) {
                            yearRef.current?.focus();
                        }else if(value.length === 0) {
                            dayRef.current?.focus()
                        }
                    }}
                    className={"rounded-md border-2 border-complementary bg-black p-2 w-16 "}
                    placeholder={"MM"}
                />
            </div>

            <div className={"flex flex-col"}>
                <label>Year</label>
                <input
                    ref={yearRef}
                    value={date[2]}
                    maxLength={4}
                    onChange={(e) => {
                        const value = e.target.value.slice(0, 4);
                         if(value.length === 0) {
                            monthRef.current?.focus()
                        }
                        setDate([date[0], date[1], value]);
                    }}
                    className={"rounded-md border-2 border-complementary bg-black p-2 w-24 "}
                    placeholder={"YYYY"}
                />
            </div>
        </div>
    );
}
