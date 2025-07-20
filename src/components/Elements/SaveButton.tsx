interface Props {
    isDisabled: boolean,
    onSave: () => void,
    className?: string
    title?: string
}
export default function SaveButton({isDisabled, onSave, className="", title="Save"} : Props) {

    const disabledClasses = isDisabled ? "bg-red-900":"hover:bg-red-800"
    return (
        <button disabled={isDisabled}
                onClick={() => {
                    onSave();
                }}
                className={"w-full text-white bg-red-600   transition-colors rounded-3xl p-4 " + className + " " + disabledClasses}>
            {title}
        </button>
    )
}