import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

// Importe seu componente de ThemeToggle
import ThemeToggle from '../components/SliderToggle';
import Logo from '../assets/img/logo.png'; // Substitua pelo caminho do seu logo

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
    }, 200); // Adiciona um atraso de 200ms para fechar o menu
  };

  return (
    <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50 font-sans dark:bg-gray-900 dark:text-gray-200">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo e Título */}
        <a href="/" className="flex items-center space-x-2">
          {/* Substitua esta URL pela URL do seu logo */}
          <img src={Logo} alt="Logo Casinha da Ana" className="h-10 w-10 rounded-full" />
          <span className="text-2xl font-bold text-white tracking-wide">
            Casinha da Ana
          </span>
        </a>

        {/* Menu Principal (Desktop) */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="/" className="text-lg hover:text-yellow-400 transition-colors duration-200">
            Home
          </a>

          {/* Container para o Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <a href="#" className="flex items-center text-lg hover:text-yellow-400 transition-colors duration-200">
              Receitas <span className="ml-1 text-xs">▼</span>
            </a>
            
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute left-1/2 -translate-x-1/2 mt-4 p-4 rounded-lg shadow-xl bg-gray-800 border border-gray-700 grid grid-cols-2 gap-x-8 gap-y-4 w-[400px] z-50"
              >
                {/* Coluna 1: Filtros */}
                <div className="flex flex-col space-y-2">
                  <h3 className="text-sm uppercase text-gray-400 font-semibold mb-2">Filtros</h3>
                  <a href="/filtros/massas" className="flex items-center p-2 hover:bg-gray-700 rounded-md transition-colors duration-200">
                    <span className="mr-3 text-2xl text-yellow-400">🍝</span>
                    <div className="flex flex-col">
                      <span className="font-medium text-white">Massas</span>
                      <span className="text-xs text-gray-400">Receitas com massas</span>
                    </div>
                  </a>
                  <a href="/filtros/carnes" className="flex items-center p-2 hover:bg-gray-700 rounded-md transition-colors duration-200">
                    <span className="mr-3 text-2xl text-red-500">🥩</span>
                    <div className="flex flex-col">
                      <span className="font-medium text-white">Carnes</span>
                      <span className="text-xs text-gray-400">Receitas com carnes</span>
                    </div>
                  </a>
                </div>

                {/* Coluna 2: Culinárias */}
                <div className="flex flex-col space-y-2">
                  <h3 className="text-sm uppercase text-gray-400 font-semibold mb-2">Culinárias</h3>
                  <a href="/culinaria/brasileira" className="flex items-center p-2 hover:bg-gray-700 rounded-md transition-colors duration-200">
                    <span className="mr-3 text-2xl text-green-500">🇧🇷</span>
                    <div className="flex flex-col">
                      <span className="font-medium text-white">Brasileira</span>
                      <span className="text-xs text-gray-400">Pratos típicos do Brasil</span>
                    </div>
                  </a>
                  <a href="/culinaria/italiana" className="flex items-center p-2 hover:bg-gray-700 rounded-md transition-colors duration-200">
                    <span className="mr-3 text-2xl text-blue-400">🇮🇹</span>
                    <div className="flex flex-col">
                      <span className="font-medium text-white">Italiana</span>
                      <span className="text-xs text-gray-400">Pratos da culinária italiana</span>
                    </div>
                  </a>
                </div>
              </motion.div>
            )}
          </div>
          
          <a href="/contato" className="text-lg hover:text-yellow-400 transition-colors duration-200">
            Contato
          </a>

          {/* Adicione o ThemeToggle aqui */}
          <ThemeToggle />
        </div>

        {/* Menu Mobile */}
        <div className="md:hidden flex items-center space-x-4">
          <ThemeToggle />
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </nav>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-gray-800 py-4"
        >
          <a href="/" className="block px-6 py-3 text-lg text-white hover:bg-gray-700 transition-colors duration-200" onClick={toggleMenu}>
            Home
          </a>
          <a href="/receitas" className="block px-6 py-3 text-lg text-white hover:bg-gray-700 transition-colors duration-200" onClick={toggleMenu}>
            Receitas
          </a>
          <div className="border-t border-gray-700 my-2"></div>
          
          {/* Seção de Filtros Mobile */}
          <div className="px-6">
            <h3 className="text-sm uppercase text-gray-400 font-semibold mb-2">Filtros</h3>
            <div className="grid grid-cols-2 gap-2">
              <a href="/filtros/massas" className="flex items-center justify-center py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors duration-200" onClick={toggleMenu}>
                <span className="text-xl mr-2">🍝</span> Massas
              </a>
              <a href="/filtros/carnes" className="flex items-center justify-center py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors duration-200" onClick={toggleMenu}>
                <span className="text-xl mr-2">🥩</span> Carnes
              </a>
              <a href="/filtros/sobremesas" className="flex items-center justify-center py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors duration-200" onClick={toggleMenu}>
                <span className="text-xl mr-2">🍰</span> Sobremesas
              </a>
              <a href="/filtros/saladas" className="flex items-center justify-center py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors duration-200" onClick={toggleMenu}>
                <span className="text-xl mr-2">🥗</span> Saladas
              </a>
            </div>
          </div>
          <div className="border-t border-gray-700 my-2"></div>
          <a href="/contato" className="block px-6 py-3 text-lg text-white hover:bg-gray-700 transition-colors duration-200" onClick={toggleMenu}>
            Contato
          </a>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;