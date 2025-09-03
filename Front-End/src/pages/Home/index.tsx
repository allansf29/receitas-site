import Carousel from "../../components/Carousel";
import Modal from "../../components/Modal";
import api from "../../services/api";
import { TimeIcon } from "../../assets/icons/SvgIcon";
import { useState, useEffect } from "react";
import RecipeCard from "../../components/RecipeCard";
import type { Recipe } from "../../types/index";
import { motion } from "framer-motion"

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  async function getRecipes() {
    const recipesFromApi = await api.get("/recipes");
    setRecipes(recipesFromApi.data);
  }

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <>
      <Carousel />
      <section className="max-w-7xl mx-auto h-auto px-6 py-4 flex flex-wrap gap-5 justify-center">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full text-3xl font-bold text-center text-text dark:text-amber-50 font-title">
          Receitas em destaque
        </motion.h2>

        {recipes
          .filter((item) => [1, 2, 3].includes(item.order))
          .map((item) => (
            <RecipeCard
              key={item.id}
              recipe={item}
              onSelect={(recipe) => setSelectedRecipe(recipe)}
            />
          ))}

        {/* Modal component */}
        <Modal isOpen={!!selectedRecipe} isClose={() => setSelectedRecipe(null)}>
          {selectedRecipe && (
            <div className="p-6 overflow-y-auto max-h-[80vh]">
              <h2 className="text-2xl font-bold mb-4 text-center">
                {selectedRecipe.title}
              </h2>
              <p className="mb-4">{selectedRecipe.description}</p>
              <img
                className="rounded-lg w-full h-48 object-cover"
                src={selectedRecipe.image}
                alt={selectedRecipe.title}
              />
              <p className="mt-4 flex items-center gap-1 text-gray-700 dark:text-gray-400">
                <TimeIcon />
                Tempo aproximado: {selectedRecipe.time} minutos</p>
              <h3 className="font-bold text-xl mt-4">Ingredientes</h3>
              <ul className="list-disc pl-5 mt-2">
                {selectedRecipe.ingredients.map((item, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-200 text-sm md:text-base">{item}</li>
                ))}
              </ul>
              <h3 className="font-bold text-xl mt-4">Modo de preparo</h3>
              <ul className="list-decimal pl-5 mt-2">
                {selectedRecipe.preparation.map((item, index) => (
                  <li key={index} className=" text-gray-700 dark:text-gray-200">{item}</li>
                ))}
              </ul>
              <button
                onClick={() => setSelectedRecipe(null)}
                className="mt-4 inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 cursor-pointer"
              >
                Fechar
              </button>
            </div>
          )}
        </Modal>
      </section>
    </>
  );
}
