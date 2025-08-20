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
      <h2 className="text-3xl font-bold text-center mb-6">Todas as Receitas</h2>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 items-center justify-center mb-6">
        {/* filtro nome */}
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded-lg shadow-sm"
        />

        {/* filtro categoria */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded-lg shadow-sm"
        >
          <option value="all">Todas</option>
          <option value="bolo">Bolos</option>
          <option value="pão">Pães</option>
          <option value="sobremesa">Sobremesas</option>
          <option value="bebida">Bebidas</option>
        </select>

        {/* filtro tempo */}
        <select
          value={maxTime ?? ""}
          onChange={(e) => setMaxTime(e.target.value ? parseInt(e.target.value) : null)}
          className="p-2 border rounded-lg shadow-sm"
        >
          <option value="">Sem limite de tempo</option>
          <option value="15">Até 15 min</option>
          <option value="30">Até 30 min</option>
          <option value="60">Até 1 hora</option>
        </select>
      </div>

      {/* Lista filtrada */}
      <div className="flex flex-wrap gap-5 justify-center">
        {filteredRecipes.map((item) => (
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
          <div className="p-6 overflow-y-auto max-h-[80vh]">
            <h2 className="text-2xl font-bold mb-4 text-center">{selectedRecipe.title}</h2>
            <p className="mb-4">{selectedRecipe.description}</p>
            <img
              className="rounded-lg w-full h-48 object-cover"
              src={selectedRecipe.image}
              alt={selectedRecipe.title}
            />
            <p className="mt-4 font-medium">
                <TimeIcon />
                Tempo aproximado: {selectedRecipe.time} min</p>
            <h3 className="font-bold text-xl mt-4">Ingredientes</h3>
            <ul className="list-disc pl-5 mt-2">
              {selectedRecipe.ingredients.map((ing, idx) => (
                <li key={idx}>{ing}</li>
              ))}
            </ul>
            <h3 className="font-bold text-xl mt-4">Modo de preparo</h3>
            {selectedRecipe.preparation.map((step, idx) => (
              <p key={idx} className="mt-2">{step}</p>
            ))}
            <button
              onClick={() => setSelectedRecipe(null)}
              className="mt-4 px-3 py-2 bg-red-500 text-white rounded-lg"
            >
              Fechar
            </button>
          </div>
        )}
      </Modal>
    </section>
  );
}
