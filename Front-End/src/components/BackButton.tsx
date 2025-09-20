import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-secondary-dark dark:hover:bg-primary-dark text-gray-700 dark:text-gray-200  transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
    >
      <ArrowLeft className="w-5 h-5" />
      <span>Voltar</span>
    </button>
  );
}
