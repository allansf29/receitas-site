import { useState, useEffect } from "react";
import api from "../../services/api";
import RecipeCard from "../../components/RecipeCard";
import Modal from "../../components/Modal";
import type { Recipe } from "../../types/index";
import { TimeIcon } from "../../assets/icons/SvgIcon";

export default function Receitas() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  // estados de filtro
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [maxTime, setMaxTime] = useState<number | null>(null);

  async function loadRecipes() {
    const res = await api.get("/recipes");
    setRecipes(res.data);
  }

  useEffect(() => {
    loadRecipes();
  }, []);

  // aplica filtros
  const filteredRecipes = recipes.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      category === "all" || item.category?.toLowerCase() === category.toLowerCase();
    const matchesTime = !maxTime || item.time <= maxTime;

    return matchesSearch && matchesCategory && matchesTime;
  });

  return (
    <section className="max-w-7xl mx-auto px-6 py-4">
      <h2 className="text-3xl font-bold text-center mb-6 dark:text-amber-50">Todas as Receitas</h2>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 items-center justify-center mb-6">
        {/* filtro nome */}
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
        />

        {/* filtro categoria */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
        >
          <option value="all">Todas</option>
          <option value="PRATO_PRINCIPAL">Prato Principal</option>
          <option value="SALGADO">Salgado</option>
          <option value="SOBREMESA">Sobremesas</option>
          <option value="BEBIDA">Bebidas</option>
          <option value="DOCE">Doces</option>
        </select>

        {/* filtro tempo */}
        <select
          value={maxTime ?? ""}
          onChange={(e) => setMaxTime(e.target.value ? parseInt(e.target.value) : null)}
          className="p-2 border rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
        >
          <option value="">Sem limite de tempo</option>
          <option value="15">Até 15 min</option>
          <option value="30">Até 30 min</option>
          <option value="60">Até 1 hora</option>
        </select>
      </div>

      {/* Lista filtrada */}
      <div className="flex flex-wrap gap-5 justify-center">
        {filteredRecipes
        .map((item) => (
          <RecipeCard
            key={item.id}
            recipe={item}
            onSelect={setSelectedRecipe}
          />
        ))}
      </div>

      {/* Modal */}
      <Modal isOpen={!!selectedRecipe} isClose={() => setSelectedRecipe(null)}>
        {selectedRecipe && (
          <div className="p-6 overflow-y-auto max-h-[80vh] ">
            <h2 className="text-2xl font-bold mb-4 text-center">
              {selectedRecipe.title}
            </h2>
            <p className="mb-4">{selectedRecipe.description}</p>
            <img
              className="rounded-lg w-full h-48 object-cover"
              src={selectedRecipe.image}
              alt={selectedRecipe.title}
            />
            <p className="mt-4 flex items-center gap-1 text-gray-700 font-medium dark:text-gray-300">
                <TimeIcon />
                Tempo aproximado: {selectedRecipe.time} minutos</p>
            <h3 className="font-bold text-xl mt-4">Ingredientes</h3>
            <ul className="list-disc pl-5 mt-2">
              {selectedRecipe.ingredients.map((item, index) => (
                <li key={index} className="text-gray-700">{item}</li>
              ))}
            </ul>
            <h3 className="font-bold text-xl mt-4">Modo de preparo</h3>
            <ul className="list-disc pl-5 mt-2">
              {selectedRecipe.preparation.map((item, index) => (
                <li key={index} className=" text-gray-700 ">{item}</li>
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
  );
}
