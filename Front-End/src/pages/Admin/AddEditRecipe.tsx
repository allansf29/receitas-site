import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import BackButton from "../../components/BackButton";

export default function AddEditRecipe() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [preparation, setPreparation] = useState("");
  const [category, setCategory] = useState("PRATO_PRINCIPAL");
  const [image, setImage] = useState("");
  const [time, setTime] = useState<number | null>(null);
  const [portions, setPortions] = useState<number | null>(null);
  const [tag, setTag] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // se estiver em modo edição (id presente) busca a receita e popula campos
    async function loadRecipe() {
      if (!id) return;
      setLoading(true);
      try {
        const res = await api.get(`/recipes/${id}`);
        const data = res.data;
        setTitle(data.title ?? "");
        setDescription(data.description ?? "");
        setIngredients(Array.isArray(data.ingredients) ? data.ingredients.join(", ") : (data.ingredients ?? ""));
        setPreparation(Array.isArray(data.preparation) ? data.preparation.join("\n") : (data.preparation ?? ""));
        setCategory(data.category ?? "PRATO_PRINCIPAL");
        setImage(data.image ?? "");
        setTime(typeof data.time === "number" ? data.time : null);
        setPortions(typeof data.portions === "number" ? data.portions : null);
        setTag(data.tag ?? null);
      } catch (err) {
        alert("Erro ao carregar a receita para edição.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadRecipe();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Você precisa entrar para continuar.");
      navigate("/admin/login");
      return;
    }

    // normaliza arrays
    const ingredientsArray = ingredients
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const preparationArray = preparation
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload: any = {
      title,
      description,
      ingredients: ingredientsArray,
      preparation: preparationArray,
      category,
      image,
      time: time ?? undefined,
      portions: portions ?? undefined,
      tag: tag ?? undefined,
    };

    try {
      if (id) {
        // modo edição -> PUT
        await api.put(`/admin/recipes/${id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Receita editada com sucesso!");
      } else {
        // modo criação -> POST
        await api.post("/admin/recipes", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Receita adicionada!");
      }
      navigate("/admin/recipes");
    } catch (err: any) {
      console.error(err);
      const msg = err?.response?.data?.error || "Erro ao salvar receita.";
      alert(msg);
    }
  }

  if (loading) return <div className="p-6">Carregando...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-4">
        <BackButton />
      </div>
      <div className="bg-white dark:bg-secondary-dark p-8 rounded-xl shadow-lg border border-gray-200 dark:border-primary-dark">

        <h2 className="text-2xl font-bold text-center mb-6 text-text dark:text-white">
          {id ? "Editar Receita" : "Adicionar Receita"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* ... (mesmos inputs do seu formulário, usando os states acima) */}
          <div className="flex flex-col">
            <label htmlFor="title" className="mb-1 text-text dark:text-gray-300 font-medium ">Título</label>
            <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-3 rounded border-gray-200 dark:border-text-dark dark:text-white" />
          </div>

          <div className="flex flex-col">
            <label htmlFor="description" className="mb-1 text-text dark:text-gray-300">Descrição</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-3 rounded min-h-[100px] border-gray-200 dark:border-text-dark dark:text-white" />
          </div>

          <div className="flex flex-col">
            <label htmlFor="ingredients" className="mb-1 text-text dark:text-gray-300">Ingredientes (separados por vírgula)</label>
            <input id="ingredients" value={ingredients} onChange={(e) => setIngredients(e.target.value)} className="border p-3 rounded border-gray-200 dark:border-text-dark dark:text-white" />
          </div>

          <div className="flex flex-col">
            <label htmlFor="preparation" className="mb-1 text-text dark:text-gray-300">Modo de Preparo (1 passo por linha)</label>
            <textarea id="preparation" value={preparation} onChange={(e) => setPreparation(e.target.value)} className="border p-3 rounded min-h-[150px] border-gray-200 dark:border-text-dark dark:text-white" />
          </div>

          <div className="flex flex-col">
            <label htmlFor="image" className="mb-1 text-text dark:text-gray-300">URL da Imagem</label>
            <input id="image" value={image} onChange={(e) => setImage(e.target.value)} className="border p-3 rounded border-gray-200 dark:border-text-dark dark:text-white" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col text-textdark:text-gray-300">
              <label htmlFor="time" className="mb-1 dark:text-gray-300">Tempo (min)</label>
              <input id="time" type="number" value={time ?? ""} onChange={(e) => setTime(e.target.value ? Number(e.target.value) : null)} className="border p-3 rounded border-gray-200 dark:border-text-dark dark:text-white" />
            </div>
            <div className="flex flex-col text-text dark:text-gray-300">
              <label htmlFor="portions" className="mb-1 dark:text-gray-300">Porções</label>
              <input id="portions" type="number" value={portions ?? ""} onChange={(e) => setPortions(e.target.value ? Number(e.target.value) : null)} className="border p-3 rounded border-gray-200 dark:border-text-dark dark:text-white" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="category" className="mb-1 text-text dark:text-gray-300">Categoria</label>
              <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="border p-3 rounded text-text dark:text-text-dark border-gray-200 dark:border-text-dark">
                <option value="PRATO_PRINCIPAL">Prato Principal</option>
                <option value="SALGADO">Salgado</option>
                <option value="SOBREMESA">Sobremesa</option>
                <option value="DOCE">Doce</option>
                <option value="BEBIDA">Bebida</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="tag" className="mb-1 text-gray-700 dark:text-gray-300">Tag</label>
              <select id="tag" value={tag ?? ""} onChange={(e) => setTag(e.target.value || null)} className="border p-3 rounded text-text dark:text-text-dark border-gray-200 dark:border-text-dark">
                <option value="">Nenhum</option>
                <option value="DESTAQUE">Destaque</option>
                <option value="RECENTE">Recente</option>
              </select>
            </div>
          </div>

          <button type="submit" className="w-full bg-gray-700 dark:bg-primary-dark text-white py-3 rounded-md cursor-pointer">
            {id ? "Salvar alterações" : "Salvar"}
          </button>
        </form>
      </div>
    </div>
  );
}
