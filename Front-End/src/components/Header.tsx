import Logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";
import ThemeToggle from "./SliderToggle";
import { FaSearch } from "react-icons/fa"; // Ícone de busca do react-icons

function Header() {
  return (
    <header className="w-full shadow-2xl dark:text-amber-50">
      <nav className="grid grid-cols-3 items-center max-w-7xl mx-auto px-6 py-3">
        
        {/* Logo */}
        <div className="flex items-center">
          <img
            className="h-14 w-14 object-cover"
            src={Logo}
            alt="Logo"
          />
        </div>

        {/* Menu central */}
        <ul className="flex justify-center gap-8 font-bold text-lg">
          <li><Link to="/" className="hover:text-primary transition">Início</Link></li>
          <li><Link to="/receitas" className="hover:text-primary transition">Receitas</Link></li>
          <li><Link to="/sobre" className="hover:text-primary transition">Sobre mim</Link></li>
        </ul>

        {/* Pesquisa + Toggle */}
        <div className="flex items-center justify-end gap-5">
          {/* Barra de pesquisa */}
          <div className="relative w-40 sm:w-56">
            <input
              type="text"
              placeholder="Pesquisar..."
              className="w-full rounded-full bg-gray-100 pl-4 pr-10 py-2 text-gray-700 
              focus:outline-none focus:ring-2 focus:ring-primary 
              dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-primary"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 
              hover:text-primary dark:text-gray-300 cursor-pointer"
            >
              <FaSearch size={16} />
            </button>
          </div>

          {/* Toggle Dark Mode */}
          <ThemeToggle />
        </div>

      </nav>
    </header>
  );
}

export default Header;

