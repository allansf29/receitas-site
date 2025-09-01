import { CloseIcon } from "../assets/icons/SvgIcon";
import { motion, AnimatePresence } from "framer-motion";

type ModalProps = {
  isOpen: boolean;
  children?: React.ReactNode;
  isClose: (isOpen: boolean) => void;
};

export default function Modal({ isOpen, isClose, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal"
          className="fixed z-[1000] inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Fundo escuro com blur */}
          <motion.div
            className="absolute inset-0 bg-black/50 dark:bg-black/65 backdrop-blur-sm"
            onClick={() => isClose(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Container do modal */}
          <motion.div
            key="content"
            className="relative 
              bg-[var(--color-background)] text-[var(--color-text)] border border-[var(--color-primary)]
              rounded-2xl shadow-xl 
              w-[90%] max-w-3xl
              dark:bg-gray-800 dark:text-amber-50 dark:border-gray-700"
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {/* Botão de fechar */}
            <button
              onClick={() => isClose(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer dark:text-gray-400 dark:hover:text-gray-200"
            >
              <CloseIcon className="h-6 w-6 text-[var(--color-detail)] dark:text-red-500" />
            </button>

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
