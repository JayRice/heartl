import {Quote} from "lucide-react"



export default function QuoteCard({title, description}: { title: string ,description: string }) {
    return (
        <div className={"h-[250px]  bg-primary border-2 border-complementary text-white rounded-lg p-4 relative"}>
            <div className={"border-b-2 border-b-complementary"}
                >
                <h1>{title}</h1>
            </div>
            <p className={"text-sm mt-2"}>{description}</p>

            <div className={"absolute top-0 right-0 "}>
                <Quote className={"w-8 h-8 m-4 text-complementary "}></Quote>
            </div>

        </div>
    )
}