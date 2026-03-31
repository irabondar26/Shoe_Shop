type ButtonProps = {
    text: string;
    active: boolean;
    customClass: string;
    addContent?: React.ReactNode;
}

export default function Button({ text, active, customClass, addContent }: ButtonProps) {
    if (!active) return null;
    return (
        <button className={`rounded-full flex items-center justify-center gap-2 ${customClass}`}>
            {text}
            {addContent && addContent}
        </button>
    );
}