import { useState, useRef, useEffect } from "react";

interface Props {
    text: string;
    className?: string;
}

const InfoTooltip = ({ text, className }: Props) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    // close when click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // close with ESC
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setOpen(false);
            }
        };

        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, []);

    return (
        <span
            ref={ref}
            className={`info-tooltip ${className ?? ""}`}
            onMouseEnter={() => setOpen(true)}   // Desktop hover
            onMouseLeave={() => setOpen(false)}  // Desktop leave
            onClick={() => setOpen((prev) => !prev)} // Mobile click
        >
      <span className="info-tooltip__icon">ⓘ</span>

            {open && (
                <span className="info-tooltip__bubble">
          {text}
        </span>
            )}
    </span>
    );
};

export default InfoTooltip;