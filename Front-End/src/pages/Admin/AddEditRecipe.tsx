import { useState } from "react";
import api from "../../services/api";

export default function AddRecipe() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [preparation, setPreparation] = useState("");
  const [category, setCategory] = useState("PRATO_PRINCIPAL");
  const [image, setImage] = useState("");
  const [time, setTime] = useState<number | null>(null); // Inicializado como null para exibir o placeholder
  const [portions, setPortions] = useState<number | null>(null);
  const [tag, setTag] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/admin/recipes",
        {
          title,
          description,  
          ingredients: ingredients.split(","),
          preparation: preparation.split("\n"),
          category,
          image,
          time,
          portions,
          tag,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Receita adicionada!");
    } catch (err) {
      alert("Erro ao salvar receita.");
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">Adicionar Receita</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Título */}
          <div className="flex flex-col">
            <label htmlFor="title" className="mb-1 text-gray-700 dark:text-gray-300 font-medium">Título</label>
            <input 
              id="title"
              type="text" 
              placeholder="Ex: Torta de Limão" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
            />
          </div>

          {/* Descrição */}
          <div className="flex flex-col">
            <label htmlFor="description" className="mb-1 text-gray-700 dark:text-gray-300 font-medium">Descrição</label>
            <textarea 
              id="description"
              placeholder="Uma breve descrição sobre a receita..." 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 min-h-[100px]" 
            />
          </div>

          {/* Ingredientes */}
          <div className="flex flex-col">
            <label htmlFor="ingredients" className="mb-1 text-gray-700 dark:text-gray-300 font-medium">Ingredientes</label>
            <input 
              id="ingredients"
              type="text" 
              placeholder="Ex: farinha, açúcar, ovos (separados por vírgula)" 
              value={ingredients} 
              onChange={(e) => setIngredients(e.target.value)} 
              className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
            />
          </div>

          {/* Modo de Preparo */}
          <div className="flex flex-col">
            <label htmlFor="preparation" className="mb-1 text-gray-700 dark:text-gray-300 font-medium">Modo de Preparo</label>
            <textarea 
              id="preparation"
              placeholder="1 passo por linha" 
              value={preparation} 
              onChange={(e) => setPreparation(e.target.value)} 
              className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 min-h-[150px]" 
            />
          </div>

          {/* URL da Imagem */}
          <div className="flex flex-col">
            <label htmlFor="image" className="mb-1 text-gray-700 dark:text-gray-300 font-medium">URL da Imagem</label>
            <input 
              id="image"
              type="text" 
              placeholder="URL da imagem (Ex: https://...)" 
              value={image} 
              onChange={(e) => setImage(e.target.value)} 
              className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
            />
          </div>

          {/* Tempo e Porções */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tempo (Minutos) */}
            <div className="flex flex-col">
              <label htmlFor="time" className="mb-1 text-gray-700 dark:text-gray-300 font-medium">Tempo (minutos)</label>
              <input 
                id="time"
                type="number" 
                placeholder="Ex: 30" 
                value={time ?? ''} // Exibe o placeholder quando o valor é nulo
                onChange={(e) => setTime(e.target.value ? Number(e.target.value) : null)} 
                className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
              />
            </div>

            {/* Porções */}
            <div className="flex flex-col">
              <label htmlFor="portions" className="mb-1 text-gray-700 dark:text-gray-300 font-medium">Porções (opcional)</label>
              <input 
                id="portions"
                type="number" 
                placeholder="Ex: 4" 
                value={portions ?? ''} 
                onChange={(e) => setPortions(e.target.value ? Number(e.target.value) : null)} 
                className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
              />
            </div>
          </div>
          
          {/* Categoria e Tag */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Categoria */}
            <div className="flex flex-col">
              <label htmlFor="category" className="mb-1 text-gray-700 dark:text-gray-300 font-medium">Categoria</label>
              <select 
                id="category"
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="PRATO_PRINCIPAL">Prato Principal</option>
                <option value="SALGADO">Salgado</option>
                <option value="SOBREMESA">Sobremesa</option>
                <option value="DOCE">Doce</option>
                <option value="BEBIDA">Bebida</option>
              </select>
            </div>

            {/* Tag */}
            <div className="flex flex-col">
              <label htmlFor="tag" className="mb-1 text-gray-700 dark:text-gray-300 font-medium">Tag (opcional)</label>
              <select 
                id="tag"
                value={tag || ""}
                onChange={(e) => setTag(e.target.value || null)} 
                className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Nenhum</option>
                <option value="DESTAQUE">Destaque</option>
                <option value="RECENTE">Recente</option>
              </select>
            </div>
          </div>
        
          <button 
            type="submit" 
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-md hover:bg-green-700 transition-all duration-200 shadow-md"
          >
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}