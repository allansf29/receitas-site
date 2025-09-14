import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { motion } from "framer-motion";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import DashboardButton from "./DashboardButton";

interface Recipe {
  id: string;
  title: string;
  category: string;
}

export default function RecipeListAdmin() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  async function fetchRecipes() {
    try {
      const response = await api.get("/recipes");
      setRecipes(response.data);
    } catch (err) {
      alert("Erro ao buscar receitas.");
    }
  }

  async function handleDelete(id: string) {
    if (window.confirm("Tem certeza que deseja remover esta receita?")) {
      try {
        const token = localStorage.getItem("token");
        await api.delete(`/admin/recipes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Receita removida com sucesso!");
        fetchRecipes();
      } catch (err) {
        alert("Erro ao remover receita.");
      }
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-4">
        <DashboardButton />
      </div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Gerenciar Receitas</h2>
        <Link
          to="/admin/add"
          className="flex items-center gap-2 bg-primary text-white py-2 px-4 rounded-lg hover:bg-text transition"
        >
          <Plus size={18} /> Nova Receita
        </Link>
      </div>

      <div className="grid gap-4">
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-700 p-5 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold dark:text-white">{recipe.title}</h3>
                <p className="text-sm text-gray-500">Categoria: {recipe.category}</p>
              </div>
              <div className="flex gap-3">
                <Link to={`/receitas/${recipe.id}`} className="p-2 bg-gray-200 dark:bg-gray-500 rounded hover:bg-gray-300">
                  <Eye size={18} />
                </Link>
                <Link to={`/admin/edit/${recipe.id}`} className="p-2 bg-yellow-400 text-white rounded hover:bg-yellow-500">
                  <Pencil size={18} />
                </Link>
                <button onClick={() => handleDelete(recipe.id)} className="p-2 bg-red-400 text-white rounded hover:bg-red-600 cursor-pointer">
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500">Nenhuma receita encontrada.</p>
        )}
      </div>
    </div>
  );
}
