import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

interface Recipe {
  id: string;
  title: string;
  category: string;
}

export default function RecipeListAdmin() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // Busca todas as receitas ao carregar o componente
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
        fetchRecipes(); // Recarrega a lista
      } catch (err) {
        alert("Erro ao remover receita.");
      }
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Gerenciar Receitas</h2>
      <Link 
        to="/admin/add" 
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all duration-200 mb-6 inline-block"
      >
        + Adicionar Nova Receita
      </Link>
      
      <div className="flex flex-col gap-4">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{recipe.title}</h3>
                <p className="text-sm text-gray-500">Categoria: {recipe.category}</p>
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/receitas/${recipe.id}`} // Link para a página pública
                  className="bg-gray-300 text-gray-800 py-1 px-3 rounded-md hover:bg-gray-400"
                >
                  Ver
                </Link>
                <Link
                  to={`/admin/edit/${recipe.id}`}
                  className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(recipe.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                >
                  Remover
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Nenhuma receita encontrada.</p>
        )}
      </div>
    </div>
  );
}