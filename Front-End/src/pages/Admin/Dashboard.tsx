import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
        <h2 className="text-xl font-bold mb-6">Painel Admin</h2>
        <nav className="flex flex-col gap-3">
          <Link to="/admin/recipes" className="hover:bg-gray-700 p-2 rounded">Gerenciar Receitas</Link>
          <Link to="/" className="hover:bg-gray-700 p-2 rounded">Voltar ao site</Link>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Bem-vindo ao painel!</h1>
        <p>Escolha uma opção no menu lateral.</p>
      </main>
    </div>
  );
}