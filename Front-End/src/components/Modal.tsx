import { useEffect, useState } from "react";
import { CloseIcon } from "../assets/icons/SvgIcon";

type ModalProps = {
    isOpen: boolean;
    children?: React.ReactNode;
    isClose: (isOpen: boolean) => void;
};

export default function Modal({ isOpen, isClose, children }: ModalProps) {
    const [show, setShow] = useState(isOpen);

    // Animação suave de entrada/saída
    useEffect(() => {
        if (isOpen) {
            setShow(true);
        } else {
            const timeout = setTimeout(() => setShow(false), 300); // Espera animação
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    if (!show) return null;

    return (
        <div
            className={`fixed z-[1000] inset-0 flex items-center justify-center transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0"
            }`}
        >
            {/* Fundo */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => isClose(false)}
            />

            {/* Conteúdo do modal */}
            <div
                className={`relative bg-white rounded-xl shadow-2xl border-2 border-blue-500 
                w-[90%] max-w-lg p-6 md:p-8 transition-all duration-300 transform
                ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
            >
                {/* Botão de fechar */}
                <button
                    onClick={() => isClose(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                    <CloseIcon className="h-6 w-6 text-red-500" />
                </button>

                {children}
            </div>
        </div>
    );
}
