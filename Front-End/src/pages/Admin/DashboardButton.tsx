import { useNavigate } from "react-router-dom";
import { ArrowLeftCircle } from "lucide-react";

export default function BackToDashboardButton() {
  const navigate = useNavigate();

  function handleBack() {
    navigate("/admin/dashboard");
  }

  return (
    <button
      onClick={handleBack}
      className="flex items-center gap-2 bg-primary dark:bg-secondary-dark dark:hover:bg-primary-dark text-white hover:bg-text px-4 py-2 rounded-md shadow-md transition-all duration-200 cursor-pointer"
    >
      <ArrowLeftCircle size={18} />
      Voltar para Dashboard
    </button>
  );
}
