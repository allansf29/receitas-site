import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import ThemeToggle from '../components/SliderToggle';
import Logo from '../assets/img/logo.png';
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<number | null>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = window.setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
  };

  const navigate = useNavigate();

  const handleFiltroClick = (categoria: string) => {
    navigate(`/receitas?categoria=${categoria}`);
  };


  return (
    <header className="bg-background shadow-lg sticky top-0 z-50 font-sans dark:bg-gray-900 dark:text-gray-200">
      <div className="top-0 left-0 w-full h-3 bg-primary dark:bg-gray-700"></div>
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between relative">
        <a className="flex items-center space-x-2 font-logo">
          <motion.img src={Logo} alt="Logo Casinha da Ana"
            className="h-10 w-10 rounded-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          />
          <motion.span
            className="text-2xl font-bold text-primary dark:text-white tracking-wide"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            Casinha da Ana
          </motion.span>
        </a>

        {/* Menu Principal (Desktop) */}
        <div className="hidden md:flex items-center space-x-8 absolute left-1/2 -translate-x-1/2">
          <Link to="/" className="text-lg text-text dark:text-white hover:text-secondary dark:hover:text-gray-400 transition-colors duration-200">
            🏠︎ Home
          </Link>

          {/* Container para o Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/receitas" className="flex items-center text-lg dark:text-white text-text hover:text-secondary dark:hover:text-gray-400 transition-colors duration-200">
              🕮 Receitas <span className="ml-1 text-xs">▼</span>
            </Link>

            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute left-1/2 -translate-x-1/2 mt-4 p-4 rounded-lg shadow-xl bg-background dark:bg-gray-800 border-2 border-text dark:border-gray-700 grid grid-cols-2 gap-x-8 gap-y-4 w-[400px] z-50"
              >
                {/* Coluna 1: Filtros */}
                <div className="flex flex-col space-y-2">
                  <h3 className="text-sm uppercase text-text dark:text-gray-400 font-semibold mb-2">Filtros</h3>

                  <div
                    onClick={() => handleFiltroClick("PRATO_PRINCIPAL")}
                    className="flex items-center p-2 hover:bg-primary dark:hover:bg-gray-700 rounded-md transition-colors duration-200 cursor-pointer"
                  >
                    <span className="mr-3 text-2xl text-yellow-400">🍽️</span>
                    <div className="flex flex-col">
                      <span className="font-medium text-text dark:text-white">Principal</span>
                      <span className="text-xs text-gray-400">Receitas de pratos principais</span>
                    </div>
                  </div>

                  <div
                    onClick={() => handleFiltroClick("SOBREMESA")}
                    className="flex items-center p-2 hover:bg-primary dark:hover:bg-gray-700 rounded-md transition-colors duration-200 cursor-pointer"
                  >
                    <span className="mr-3 text-2xl text-red-500">🍮</span>
                    <div className="flex flex-col">
                      <span className="font-medium text-text dark:text-white">Sobremesas</span>
                      <span className="text-xs text-gray-400">Pudim, mousse, brownies, etc..</span>
                    </div>
                  </div>
                </div>


                {/* Coluna 2: Culinárias */}
                <div className="flex flex-col space-y-2">
                  <h3 className="text-sm uppercase text-text dark:text-gray-400 font-semibold mb-2">Filtros</h3>

                  <div
                    onClick={() => handleFiltroClick("SALGADO")}
                    className="flex items-center p-2 hover:bg-primary dark:hover:bg-gray-700 rounded-md transition-colors duration-200 cursor-pointer"
                  >
                    <span className="mr-3 text-2xl text-red-500">🥧</span>
                    <div className="flex flex-col">
                      <span className="font-medium text-text dark:text-white">Salgados</span>
                      <span className="text-xs text-gray-400">Tortas, coxinhas, pasteis, milho, etc..</span>
                    </div>
                  </div>

                  <div
                    onClick={() => handleFiltroClick("DOCE")}
                    className="flex items-center p-2 hover:bg-primary dark:hover:bg-gray-700 rounded-md transition-colors duration-200 cursor-pointer"
                  >
                    <span className="mr-3 text-2xl text-yellow-400">🍰</span>
                    <div className="flex flex-col">
                      <span className="font-medium text-text dark:text-white">Doces</span>
                      <span className="text-xs text-gray-400">Brigadeiro, cocada, Beijinho, etc..</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <Link to="/sobre" className="text-lg hover:text-secondary text-text dark:text-white dark:hover:text-gray-400 transition-colors duration-200">
            🔍︎ Sobre
          </Link>
        </div>
        <div className="transform scale-70 md:scale-100">
          <ThemeToggle />
        </div>


        {/* Menu Mobile */}
        <div className="md:hidden flex items-center space-x-4">

          <button onClick={toggleMenu} className="text-primary dark:text-white focus:outline-none z-[1000]">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 md:hidden z-40"
        >
          {/* overlay que desfoca e fecha ao clicar fora */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={toggleMenu} />

          {/* menu em si (parte visível) */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed left-0 right-0 top-0 md:hidden bg-text dark:bg-gray-800 py-4 z-50"
            onClick={(e) => e.stopPropagation()} // evita fechar ao clicar dentro do menu
          >

            <Link to="/" className="block w-50 px-6 py-3 text-lg text-primary dark:text-white hover:bg-gray-700 transition-colors duration-200" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/receitas" className="block w-50 px-6 py-3 text-lg text-primary dark:text-white hover:bg-gray-700 transition-colors duration-200" onClick={toggleMenu}>
              Receitas
            </Link>
            <Link to="/sobre" className="block w-50 px-6 py-3 text-lg text-primary dark:text-white hover:bg-gray-700 transition-colors duration-200" onClick={toggleMenu}>
              Sobre
            </Link>
            <div className="border-t border-primary dark:border-gray-700 my-2"></div>

            {/* Seção de Filtros Mobile */}
            <div className="px-6">
              <h3 className="text-sm uppercase text-background dark:text-gray-400 font-semibold mb-2">Filtros</h3>
              <div className="grid grid-cols-2 gap-2">
                <div
                  onClick={() => {
                    handleFiltroClick("PRATO_PRINCIPAL");
                    toggleMenu();
                  }}
                  className="flex items-center justify-center py-2 text-background bg-primary dark:bg-gray-700 rounded-md hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
                >
                  <span className="text-xl mr-2">🍽️</span> Prato Principal
                </div>

                <div
                  onClick={() => {
                    handleFiltroClick("SOBREMESA");
                    toggleMenu();
                  }}
                  className="flex items-center justify-center py-2 text-background bg-primary dark:bg-gray-700 rounded-md hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
                >
                  <span className="text-xl mr-2">🍮</span> Sobremesas
                </div>

                <div
                  onClick={() => {
                    handleFiltroClick("SALGADO");
                    toggleMenu();
                  }}
                  className="flex items-center justify-center py-2 text-background bg-primary dark:bg-gray-700 rounded-md hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
                >
                  <span className="text-xl mr-2">🥧</span> Salgados
                </div>

                <div
                  onClick={() => {
                    handleFiltroClick("DOCE");
                    toggleMenu();
                  }}
                  className="flex items-center justify-center py-2 text-background bg-primary dark:bg-gray-700 rounded-md hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
                >
                  <span className="text-xl mr-2">🍰</span> Doces
                </div>
              </div>
            </div>
            <div className="border-t border-primary dark:border-gray-700 my-2"></div>
            {/* <div className="px-42 mb-2">
              <ThemeToggle />
            </div> */}
          </motion.div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;