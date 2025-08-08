function Header() {
    return (
        <header className="w-full bg-white">
            <nav className="flex items-center justify-between max-w-7xl mx-auto h-20 px-6 py-4">
                <h1 className="text-2xl font-inter">Delicias a mesa</h1>
                <ul className="flex gap-6 font-bold text-lg">
                    <li><a href="#inicio">Início</a></li>
                    <li><a href="#receitas">Receitas</a></li>
                    <li><a href="#sobre">Sobre</a></li>
                </ul>
                <input type="text" className="w-64 rounded-full bg-gray-100 px-4 py-2 text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300" placeholder="Pesquisar receitas..." />
            </nav>
        </header>
    );
}

export default Header;
