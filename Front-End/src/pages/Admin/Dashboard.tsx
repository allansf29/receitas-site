import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ClipboardList, PlusCircle, Home } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex bg-background dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-8 text-center">Painel Admin</h2>
        <nav className="flex flex-col gap-4">
          <Link to="/admin/recipes" className="hover:bg-gray-700 p-3 rounded flex items-center gap-2">
            <ClipboardList size={18} /> Gerenciar Receitas
          </Link>
          <Link to="/admin/add" className="hover:bg-gray-700 p-3 rounded flex items-center gap-2">
            <PlusCircle size={18} /> Nova Receita
          </Link>
          <Link to="/" className="hover:bg-gray-700 p-3 rounded flex items-center gap-2">
            <Home size={18} /> Voltar ao Site
          </Link>
        </nav>
      </aside>

      {/* Conteúdo */}
      <main className="flex-1 p-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-6 text-text dark:text-white"
        >
          Bem-vindo ao Painel!
        </motion.h1>

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
