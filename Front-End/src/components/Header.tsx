function Header() {
  return (
    <header className="w-full bg-white">
      <nav className="flex flex-wrap items-center justify-between max-w-7xl mx-auto h-auto px-4 py-4">
        
        {/* Logo */}
        <h1 className="text-xl sm:text-2xl font-inter">Delicias a mesa</h1>

        {/* Menu */}
        <ul className="flex gap-4 sm:gap-6 font-bold text-base sm:text-lg mt-2 sm:mt-0">
          <li><a href="#inicio">Início</a></li>
          <li><a href="#receitas">Receitas</a></li>
          <li><a href="#sobre">Sobre mim</a></li>
        </ul>

        {/* Campo de pesquisa */}
        <input
          type="text"
          className="w-full sm:w-64 mt-2 sm:mt-0 rounded-full bg-gray-100 px-4 py-2 text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
          placeholder="Pesquisar receita..."
        />
      </nav>
    </header>
  );
}

export default Header;

