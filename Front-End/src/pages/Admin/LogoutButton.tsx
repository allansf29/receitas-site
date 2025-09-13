import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    alert("Você saiu da conta.");
    navigate("/admin/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-md transition-all duration-200 cursor-pointer"
    >
      <LogOut size={18} />
      Sair
    </button>
  );
}
