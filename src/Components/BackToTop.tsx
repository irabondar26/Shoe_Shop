import { useState, useEffect } from "react";
import Button from "./Button"
import ArrowWhite from "../Img/arrowWhite.svg"

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const handleScrollUp = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className={`fixed bottom-8 right-8 z-[60] transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}>
            <Button
                text=""
                active={true}
                onClick={handleScrollUp}
                customClass="w-12 h-12 bg-blue-900 shadow-2xl hover:bg-yellow-400 transition-colors duration-500"
                addContent={
                    <img src={ArrowWhite} alt="arrow" className="rotate-270 w-5 h-5" />
                }
            />
        </div>
    )
}