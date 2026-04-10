type ButtonProps = {
    text: string;
    active: boolean;
    customClass: string;
    addContent?: React.ReactNode;
    onClick?: () => void;
}

export default function Button({ text, active, customClass, addContent, onClick }: ButtonProps) {
    if (!active) return null;
    return (
        <button className={`rounded-full flex items-center justify-center gap-2 ${customClass}`}
            onClick={onClick}>
            {text}
            {addContent && addContent}
        </button>
    );
}