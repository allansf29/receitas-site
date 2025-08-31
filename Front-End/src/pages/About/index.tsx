"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      {/* Título com animação */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-5xl font-extrabold text-primary dark:text-white mb-10 text-center"
      >
        Sobre Nós
      </motion.h1>

      {/* Texto de introdução */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.3 }}
        className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto text-center mb-12"
      >
        Bem-vindo(a) ao <span className="font-semibold text-primary">Casinha da Ana</span> 🍲.  
        Um espaço criado para compartilhar receitas caseiras com muito amor e simplicidade, 
        onde cada prato traz memórias e inspiração para momentos especiais.
      </motion.p>

      {/* Grid de cards animados */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Card 1 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="bg-background dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition"
        >
          <h2 className="text-2xl font-bold text-secondary mb-4">✨ Nossa Missão</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Tornar a cozinha um lugar divertido e acessível, com receitas práticas,
            criativas e cheias de sabor, perfeitas para qualquer momento do dia.
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="bg-background dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition"
        >
          <h2 className="text-2xl font-bold text-secondary mb-4">👩‍🍳 Quem Somos</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Somos apaixonados por gastronomia e acreditamos que cozinhar vai além de preparar pratos:
            é transformar ingredientes simples em memórias inesquecíveis.
          </p>
        </motion.div>
      </div>

      {/* Sessão extra com animação */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.8 }}
        className="mt-16 text-center"
      >
        <p className="text-xl text-gray-700 dark:text-gray-400 max-w-2xl mx-auto">
          🌱 Aqui você encontra receitas doces, salgadas, rápidas e saudáveis.  
          Nossa missão é inspirar você a colocar <span className="font-semibold text-primary">mais amor na cozinha</span> e na sua mesa.
        </p>
      </motion.div>
    </section>
  );
}
