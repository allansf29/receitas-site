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
  const [showConfirm, setShowConfirm] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState<string | null>(null);

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

  async function confirmDelete() {
    if (!recipeToDelete) return;
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/admin/recipes/${recipeToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowConfirm(false);
      setRecipeToDelete(null);
      fetchRecipes();
    } catch (err) {
      alert("Erro ao remover receita.");
    }
  }

  function handleDeleteClick(id: string) {
    setRecipeToDelete(id);
    setShowConfirm(true);
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-4">
        <DashboardButton />
      </div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white sm:text-3xl font-title">
          Gerenciar Receitas
        </h2>
        <Link
          to="/admin/add"
          className="flex items-center gap-2 bg-primary dark:bg-secondary-dark text-white py-2 px-4 rounded-lg hover:bg-text dark:hover:bg-primary-dark transition"
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
              className="bg-white dark:bg-secondary-dark p-5 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold dark:text-white">{recipe.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Categoria: {recipe.category}</p>
              </div>
              <div className="flex gap-3">
                <Link
                  to={`/receitas/${recipe.id}`}
                  className="p-2 bg-gray-200 dark:bg-gray-400 rounded hover:bg-gray-300"
                >
                  <Eye size={18} />
                </Link>
                <Link
                  to={`/admin/edit/${recipe.id}`}
                  className="p-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                >
                  <Pencil size={18} />
                </Link>
                <button
                  onClick={() => handleDeleteClick(recipe.id)}
                  className="p-2 bg-red-400 text-white rounded hover:bg-red-600 cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500">Nenhuma receita encontrada.</p>
        )}
      </div>

      {/* Modal de confirmação */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white dark:bg-secondary-dark p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">
              Tem certeza que deseja excluir?
            </h3>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
