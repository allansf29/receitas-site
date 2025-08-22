import Logo from "../assets/img/logo.png";
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="w-full shadow-2xl dark:text-amber-50">
      <nav className="flex flex-col sm:flex-row items-center sm:justify-between max-w-7xl mx-auto h-auto px-1 py-1 gap-2 sm:gap-0">
        {/* Logo */}
        <img className="h-20 w-20 object-cover mb-2 sm:mb-0" src={Logo} alt="Logo" />
        {/* Menu */}
        <ul className="flex gap-4 sm:gap-6 font-bold text-base sm:text-lg mb-2 sm:mb-0">
          <li><Link to="/">Início</Link></li>
          <li><Link to="/receitas">Receitas</Link></li>
          <li><Link to="/sobre">Sobre mim</Link></li>
        </ul>
        {/* Campo de pesquisa */}
        <input
          type="text"
          className="w-full sm:w-64 rounded-full bg-gray-100 px-4 py-2 text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-500"
          placeholder="Pesquisar receita..."
        />
      </nav>
    </header>
  );
}

export default Header;

