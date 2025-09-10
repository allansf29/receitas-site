import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

interface Recipe {
  title: string;
  description: string;
  ingredients: string[];
  preparation: string[];
  category: string;
  image: string;
  time: number;
  portions?: number;
}

export default function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await api.get(`/recipes/${id}`);
        setRecipe(response.data);
      } catch (err) {
        alert("Receita não encontrada!");
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchRecipe();
    }
  }, [id]);

  if (loading) {
    return <div className="p-6 text-center">Carregando...</div>;
  }

  if (!recipe) {
    return <div className="p-6 text-center">Receita não encontrada.</div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <img src={recipe.image} alt={recipe.title} className="w-full h-80 object-cover rounded-lg mb-6 shadow-md" />
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">{recipe.title}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{recipe.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">Ingredientes</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
            {recipe.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">Preparo</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
            {recipe.preparation.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}