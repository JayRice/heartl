import {Quote} from "lucide-react"



export default function QuoteCard({title, description}: { title: string ,description: string }) {
    return (
        <div className={"w-[400px] h-[300px] bg-primary border-2 border-complementary text-white rounded-lg p-4"}>
            <div className={"border-b-2 border-b-complementary"}>
                <h1>{title}</h1>
            </div>
            <p className={""}>{description}</p>

        </div>
    )
}