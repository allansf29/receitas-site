import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ClipboardList, PlusCircle, Home } from "lucide-react";
import LogoutButton from "./LogoutButton";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex bg-background dark:bg-gray-900">
      <main className="flex-1 p-10">
        <div className="flex justify-between items-center mb-5">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-6 text-text dark:text-white"
        >
          Bem-vindo ao Painel!
        </motion.h1>
        <LogoutButton />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/admin/recipes" className="block">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center h-full flex flex-col justify-center"
            >
              <ClipboardList className="mx-auto mb-3 text-blue-600" size={34} />
              <h3 className="text-lg font-semibold text-text dark:text-white">Gerenciar Receitas</h3>
              <p className="text-primary dark:text-gray-400 text-sm">Edite, remova ou adicione receitas existentes.</p>
            </motion.div>
          </Link>

          <Link to="/admin/add" className="block">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center h-full flex flex-col justify-center"
            >
              <PlusCircle className="mx-auto mb-3 text-green-600" size={34} />
              <h3 className="text-lg font-semibold text-text dark:text-white">Adicionar Receita</h3>
              <p className="text-primary dark:text-gray-400 text-sm">Crie novas receitas para o site.</p>
            </motion.div>
          </Link>

          <Link to="/" className="block">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center h-full flex flex-col justify-center"
            >
              <Home className="mx-auto mb-3 text-purple-600" size={34} />
              <h3 className="text-lg font-semibold text-text dark:text-white">Voltar ao Site</h3>
              <p className="text-primary dark:text-gray-400 text-sm">Veja como os usuários enxergam o conteúdo.</p>
            </motion.div>
          </Link>
        </div>
      </main>
    </div>
  );
}
