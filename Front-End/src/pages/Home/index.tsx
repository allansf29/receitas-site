import Carousel from "../../components/Carousel";
import Modal from "../../components/Modal";
import api from "../../services/api";
import { TimeIcon, SaladIcon } from "../../assets/icons/SvgIcon";
import { useState, useEffect } from "react";
import RecipeCard from "../../components/RecipeCard";
import type { Recipe } from "../../types/index";
import { motion } from "framer-motion"
import { DrawOutlineButton } from "../../components/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

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
          className="w-full text-3xl font-bold text-center text-text dark:text-text-dark font-title">
          Receitas em destaque
        </motion.h2>

        {recipes
          .filter((item) => item.tag && ["DESTAQUE"].includes(item.tag))
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
              <h2 className="text-2xl font-bold mb-4 text-center dark:text-qhite">
                {selectedRecipe.title}
              </h2>
              <p className="mb-4 text-primary dark:text-text-dark font-bold">{selectedRecipe.description}</p>
              <img
                className="rounded-lg w-full h-48 object-cover"
                src={selectedRecipe.image}
                alt={selectedRecipe.title}
              />
              <div className="flex justify-between md:flex-row gap-6 mt-4 text-[12px] md:text-base">
                <p className="mt-4 flex items-center gap-1 text-gray-700 dark:text-gray-300">
                  <TimeIcon />
                  Tempo aproximado: {selectedRecipe.time} min
                </p>
                <p className="mt-4 flex items-center gap-1 text-gray-700 dark:text-gray-300">
                  <SaladIcon />
                  Porções: {selectedRecipe.portions}
                </p>
              </div>
              <h3 className="font-bold text-xl mt-4">Ingredientes</h3>
              <ul className="list-disc pl-5 mt-2">
                {selectedRecipe.ingredients.map((item, index) => (
                  <li key={index} className="text-gray-700 dark:text-text-dark text-sm md:text-base">{item}</li>
                ))}
              </ul>
              <h3 className="font-bold text-xl mt-4">Modo de preparo</h3>
              <ul className="list-decimal pl-5 mt-2">
                {selectedRecipe.preparation.map((item, index) => (
                  <li key={index} className=" text-gray-700 dark:text-text-dark">{item}</li>
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
      <section className="max-w-7xl mx-auto h-auto px-6 py-4 flex flex-col gap-6">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
          className="w-full p-5 text-3xl font-bold text-center text-text dark:text-text-dark font-title"
        >
          Receitas recentes
        </motion.h2>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="w-full"
        >
          {recipes
            .filter((item) => item.tag && ["RECENTE"].includes(item.tag))
            .map((item) => (
              <SwiperSlide key={item.id}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col bg-background dark:bg-secondary-dark shadow-lg rounded-xl overflow-hidden border-2 border-dashed border-dark"
                >
                  {/* Imagem da receita */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />

                  {/* Conteúdo da receita */}
                  <div className="p-6 flex flex-col justify-between">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {item.description}
                    </p>
                    <DrawOutlineButton
                      onClick={() => setSelectedRecipe(item)}
                      className="bg-primary text-background hover:bg-secondary px-4 py-2 w-fit"
                    >
                      Ver receita
                    </DrawOutlineButton>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
        </Swiper>

        {/* Botão de Ver todas */}
        <div className="w-full flex justify-center mt-6">
          <DrawOutlineButton
            onClick={() => (window.location.href = "/receitas")}
            className="bg-primary text-background hover:bg-secondary px-6 py-3 rounded-lg shadow-md"
          >
            Ver todas as receitas
          </DrawOutlineButton>
        </div>
      </section>
    </>
  );
}
