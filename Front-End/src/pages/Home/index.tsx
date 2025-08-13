import Carousel from "../../components/Carousel";
import Modal from "../../components/Modal";
import api from "../../services/api";
import { ArrowRightIcon, TimeIcon } from "../../assets/icons/SvgIcon";
import { useState, useEffect } from "react";

type Recipe = {
  id: string;
  title: string;
  description: string;
  image: string;
  time: number;
};

export default function Home() {

 const [recipes, setRecipes] = useState<Recipe[]>([]);

  async function getUsers() {
   const recipesFromApi = await api.get('/recipes')

   setRecipes(recipesFromApi.data);
  }

  useEffect(() => {
    getUsers();
  }, []);

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  return (
    <>
      <Carousel />
      <section className="max-w-7xl mx-auto h-20 px-6 py-4 flex flex-wrap gap-5">
        <h2 className="w-full text-3xl font-bold text-center">Receitas em destaque</h2>
        {recipes.map((item, index) => (
          <div key={index} className="max-w-sm bg-gray-100 border border-gray-200 rounded-lg shadow-sm ">
            <a href="#">
              <img className="rounded-t-lg w-full h-48 object-cover" src={item.image} alt={item.title} />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{item.title}</h5>
              </a>
              <p className="mb-3 font-normal">{item.description}</p>
              <button
                onClick={() => setSelectedRecipe(item)}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">Ver receita
                <ArrowRightIcon />
              </button>
            </div>
          </div>
        ))}

        {/* Modal component */}
        <Modal isOpen={!!selectedRecipe} isClose={() => setSelectedRecipe(null)}>
          {/* children*/}
          {selectedRecipe && (
            <>
              <h2 className="text-2xl font-bold mb-4">{selectedRecipe.title}</h2>
              <p className="mb-4">{selectedRecipe.description}</p>
              <img className="rounded-lg w-full h-48 object-cover" src={selectedRecipe.image} alt={selectedRecipe.title} />
              <a className="mt-4 flex items-center gap-1 text-gray-700 font-medium">
                <TimeIcon />
                Tempo aproximado: {selectedRecipe.time} minutos</a>
            </>
          )}
        </Modal>

      </section>
    </>
  )
}
