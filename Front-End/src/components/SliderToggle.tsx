import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

type ToggleOptionsType = "light" | "dark";

const TOGGLE_CLASSES =
  "text-sm font-medium flex items-center gap-2 px-3 py-1.5 transition-colors relative z-10";

const ThemeToggle = () => {
  const [selected, setSelected] = useState<ToggleOptionsType | null>(null);

  // Carrega o tema salvo no localStorage OU define dark como padrão
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as ToggleOptionsType | null;
    const initialTheme = savedTheme || "dark"; // se não tiver nada, começa no dark
    setSelected(initialTheme);
    document.documentElement.classList.add(initialTheme);
  }, []);

  // Atualiza o tema quando `selected` mudar
  useEffect(() => {
    if (!selected) return; // se ainda não foi definido, não faz nada

    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(selected);

    // Salva no localStorage
    localStorage.setItem("theme", selected);
  }, [selected]);

  return (
    <div className="relative flex items-center rounded-full border border-primary dark:border-gray-700 transition-colors duration-500">
      {/* Light */}
      <button
        className={`${TOGGLE_CLASSES} ${
          selected === "light"
            ? "text-white"
            : "text-gray-700 dark:text-gray-300 cursor-pointer"
        }`}
        onClick={() => setSelected("light")}
      >
        <FiSun className="text-lg" />
      </button>

      {/* Dark */}
      <button
        className={`${TOGGLE_CLASSES} ${
          selected === "dark"
            ? "text-white"
            : "text-gray-700 dark:text-gray-300 cursor-pointer"
        }`}
        onClick={() => setSelected("dark")}
      >
        <FiMoon className="text-lg" />
      </button>

      {/* Background animado */}
      {selected && (
        <div
          className={`absolute inset-0 z-0 flex ${
            selected === "dark" ? "justify-end" : "justify-start"
          }`}
        >
          <motion.span
            layout
            transition={{ type: "spring", damping: 15, stiffness: 250 }}
            className="h-full w-1/2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600"
          />
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
