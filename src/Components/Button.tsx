import {ButtonProps} from "../types/types";

export default function Button({ text, active, customClass, addContent, onClick }: ButtonProps) {
    if (!active) return null;
    return (
        <button className={`rounded-full flex items-center justify-center gap-2 ${customClass} cursor-pointer`}
            onClick={onClick}>
            {text}
            {addContent && addContent}
        </button>
    );
}