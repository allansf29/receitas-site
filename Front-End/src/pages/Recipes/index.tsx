import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../services/api";
import RecipeCard from "../../components/RecipeCard";
import Modal from "../../components/Modal";
import type { Recipe } from "../../types/index";
import { TimeIcon } from "../../assets/icons/SvgIcon";
import { motion, AnimatePresence } from "framer-motion";

export default function Receitas() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  // estados de filtro
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [maxTime, setMaxTime] = useState<number | null>(null);

  const [searchParams] = useSearchParams();

  async function loadRecipes() {
    const res = await api.get("/recipes");
    setRecipes(res.data);
  }

  useEffect(() => {
    loadRecipes();
  }, []);

  // 🔑 se tiver query param, seta a categoria inicial
  useEffect(() => {
    const categoriaParam = searchParams.get("categoria");
    if (categoriaParam) {
      setCategory(categoriaParam);
    }
  }, [searchParams]);

  // aplica filtros
  const filteredRecipes = recipes.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "all" ||
      item.category?.toLowerCase() === category.toLowerCase();

    const matchesTime = !maxTime || item.time <= maxTime;

    return matchesSearch && matchesCategory && matchesTime;
  });

  return (
    <section className="max-w-7xl mx-auto px-6 py-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-text dark:text-amber-50">
        Todas as Receitas
      </h2>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row md:flex-wrap gap-4 items-center justify-center mb-8">
        {/* filtro nome */}
        <motion.input
          whileFocus={{ scale: 1.03, boxShadow: "0 0 12px rgba(0,0,0,0.15)" }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          type="text"
          placeholder="🔍︎ Buscar receita..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-64 px-4 py-2 rounded-xl border border-primary/50 shadow-sm 
               bg-background dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100
               focus:outline-none "
        />

        {/* filtro categoria */}
        <motion.select
          whileFocus={{ scale: 1.03, boxShadow: "0 0 12px rgba(0,0,0,0.15)" }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full md:w-48 px-4 py-2 rounded-xl border border-primary/50 shadow-sm 
               bg-background dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300
               focus:outline-none"
        >
          <option value="all">Todas</option>
          <option value="PRATO_PRINCIPAL">Prato Principal</option>
          <option value="SALGADO">Salgado</option>
          <option value="SOBREMESA">Sobremesas</option>
          <option value="BEBIDA">Bebidas</option>
          <option value="DOCE">Doces</option>
        </motion.select>

        {/* filtro tempo */}
        <motion.select
          whileFocus={{ scale: 1.03, boxShadow: "0 0 12px rgba(0,0,0,0.15)" }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          value={maxTime ?? ""}
          onChange={(e) =>
            setMaxTime(e.target.value ? parseInt(e.target.value) : null)
          }
          className="w-full md:w-56 px-4 py-2 rounded-xl border border-primary/50 shadow-sm 
               bg-background dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300
               focus:outline-none"
        >
          <option value="">⏱️ Sem limite de tempo</option>
          <option value="15">Até 15 min</option>
          <option value="30">Até 30 min</option>
          <option value="60">Até 1 hora</option>
        </motion.select>
      </div>

      {/* Lista filtrada */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        <AnimatePresence>
          {filteredRecipes.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full"
            >
              <RecipeCard recipe={item} onSelect={setSelectedRecipe} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>


      {/* Modal */}
      <Modal isOpen={!!selectedRecipe} isClose={() => setSelectedRecipe(null)}>
        {selectedRecipe && (
          <div className="p-6 overflow-y-auto max-h-[80vh] ">
            <h2 className="text-2xl font-bold mb-4 text-center">
              {selectedRecipe.title}
            </h2>
            <p className="mb-4 font-bold">{selectedRecipe.description}</p>
            <img
              className="rounded-lg w-full h-48 object-cover"
              src={selectedRecipe.image}
              alt={selectedRecipe.title}
            />
            <p className="mt-4 flex items-center gap-1 text-gray-700 dark:text-gray-400">
              <TimeIcon />
              Tempo aproximado: {selectedRecipe.time} minutos
            </p>
            <h3 className="font-bold text-xl mt-4">Ingredientes</h3>
            <ul className="list-disc pl-5 mt-2">
              {selectedRecipe.ingredients.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-200 text-sm md:text-base"
                >
                  {item}
                </li>
              ))}
            </ul>
            <h3 className="font-bold text-xl mt-4">Modo de preparo</h3>
            <ul className="list-decimal pl-5 mt-2">
              {selectedRecipe.preparation.map((item, index) => (
                <li
                  key={index}
                  className=" text-gray-700 dark:text-gray-200 text-sm md:text-base"
                >
                  {item}
                </li>
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
