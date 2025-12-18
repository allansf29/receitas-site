import { FaInstagram, FaTiktok } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="bg-background dark:bg-background-dark pt-12 pb-6 mt-16 border-t border-primary/20 dark:border-secondary-dark">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Logo / Nome */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-2xl font-bold text-primary dark:text-text-dark font-title">Casinha da Ana</h2>
                    <p className="mt-2 text-sm text-text dark:text-text-dark max-w-xs">
                        Receitas simples, rápidas e deliciosas para o seu dia a dia.
                        Inspire-se e experimente novos sabores!
                    </p>
                </motion.div>

                {/* Navegação */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col space-y-2"
                >
                    <h3 className="text-lg font-semibold text-primary dark:text-text-dark font-title">Navegação</h3>
                    <a
                        href="/"
                        className="text-text dark:text-text-dark hover:text-primary dark:hover:text-detail-dark transition-colors"
                    >
                        Início
                    </a>
                    <a
                        href="/receitas"
                        className="text-text dark:text-text-dark hover:text-primary dark:hover:text-detail-dark transition-colors"
                    >
                        Receitas
                    </a>
                    <a
                        href="/sobre"
                        className="text-text dark:text-text-dark hover:text-primary dark:hover:text-detail-dark transition-colors"
                    >
                        Sobre
                    </a>
                </motion.div>

                {/* Redes sociais */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <h3 className="text-lg font-semibold text-primary dark:text-text-dark font-title mb-2">Siga-nos</h3>
                    <div className="flex space-x-6">
                        <motion.a
                            href="https://www.instagram.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            className="text-text dark:text-text-dark hover:text-primary dark:hover:text-detail-dark transition-colors"
                        >
                            <FaInstagram size={26} />
                        </motion.a>
                        <motion.a
                            href="https://www.tiktok.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2, rotate: -5 }}
                            className="text-text dark:text-text-dark hover:text-primary dark:hover:text-detail-dark transition-colors"
                        >
                            <FaTiktok size={26} />
                        </motion.a>
                    </div>
                </motion.div>
            </div>

            {/* Copyright */}
            <div className="mt-10 border-t border-primary/20 dark:border-secondary-dark pt-4 text-center">
                <p className="text-sm text-text dark:text-text-dark">
                    © {new Date().getFullYear()}{" "}
                    <a href="https://allansf29.vercel.app" target="_blank" className="hover:text-red-500 transition-colors">
                        Allanv29
                    </a>
                    . Todos os direitos reservados.
                </p>
            </div>
        </footer>
    );
}
