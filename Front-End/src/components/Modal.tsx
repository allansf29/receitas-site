import { useEffect, useState } from "react";
import { CloseIcon } from "../assets/icons/SvgIcon";

type ModalProps = {
    isOpen: boolean;
    children?: React.ReactNode;
    isClose: (isOpen: boolean) => void;
};

export default function Modal({ isOpen, isClose, children }: ModalProps) {
    const [show, setShow] = useState(isOpen);

    // Controla o "montar/desmontar" para permitir a animação
    useEffect(() => {
        if (isOpen) {
            setShow(true);
        } else {
            const timeout = setTimeout(() => setShow(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("modal-open");
        } else {
            document.body.classList.remove("modal-open");
        }
    }, [isOpen]);


    if (!show) return null;

    return (
 <div
            className={`fixed z-[1000] inset-0 flex items-center justify-center transition-opacity duration-300 
            ${isOpen ? "opacity-100" : "opacity-0"}`}
        >
            {/* Fundo escuro com blur */}
            <div
                className="absolute inset-0 bg-black/50 dark:bg-black/65 backdrop-blur-sm"
                onClick={() => isClose(false)}
            />

            {/* Container do modal */}
            <div
                className={`relative 
                bg-[var(--color-background)] text-[var(--color-text)] border border-[var(--color-primary)]
                rounded-2xl shadow-xl 
                w-[90%] max-w-3xl transition-all duration-300 transform
                dark:bg-gray-800 dark:text-amber-50 dark:border-gray-700
                ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
            >
                {/* Botão de fechar */}
                <button
                    onClick={() => isClose(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <CloseIcon className="h-6 w-6 text-[var(--color-detail)] dark:text-red-500" />
                </button>

                {children}
            </div>
        </div>
    );
}

