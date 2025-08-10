import { CloseIcon } from "../assets/icons/SvgIcon";

type ModalProps = {
    isOpen: boolean
    children?: React.ReactNode
    isClose: (isOpen: boolean) => void
}

export default function Modal({ isOpen, isClose, children }: ModalProps) {

    if (isOpen) {
        return (
            <div className="fixed z-[1000] inset-0">
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-gray-100 opacity-50"></div>
                <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-[150px] bg-white rounded-lg border-blue-500 border-2 text-black shadow-lg">
                    <button
                        onClick={() => isClose(false)}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                        <CloseIcon className="h-6 w-6 text-red-500" />
                    </button>
                    {children}
                </div>
            </div>
        )
    } else {
        return null;
    }

}
