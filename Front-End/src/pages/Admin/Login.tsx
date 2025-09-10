import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { motion } from "framer-motion";
import { Lock, User } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await api.post("/admin/login", { username, password });
      localStorage.setItem("token", res.data.token);
      // vai pra lista de receitas do admin
      navigate("/admin/recipes");
    } catch (err) {
      console.error("Login erro:", err);
      alert("Login inválido!");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl"
      >
        <header className="mb-6 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-green-600 flex items-center justify-center text-white mb-3">
            {/* simples "logo" */}
            <span className="font-bold text-xl">R</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Admin Login</h2>
          <p className="text-sm text-gray-500">Entre com sua conta de administrador</p>
        </header>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <label className="flex items-center gap-2 border rounded-lg p-2 focus-within:ring-2 focus-within:ring-green-500">
            <User size={18} className="text-gray-400" />
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="flex-1 bg-transparent outline-none"
            />
          </label>

          <label className="flex items-center gap-2 border rounded-lg p-2 focus-within:ring-2 focus-within:ring-green-500">
            <Lock size={18} className="text-gray-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              className="flex-1 bg-transparent outline-none"
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              submitting ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {submitting ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <footer className="mt-4 text-center text-sm text-gray-500">
          <span>Precisa de ajuda? Fala comigo 😄</span>
        </footer>
      </motion.div>
    </div>
  );
}
