import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import { PrismaClient } from '@prisma/client';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'http://192.168.1.105:5173'],
}));

// Rota de Login (Pública)
app.post('/admin/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { username } });
        if (!user) {
            return res.status(401).json({ error: "Usuário não encontrado" });
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(401).json({ error: "Senha incorreta" });
        }
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ error: "Configuração JWT falhou (verifique .env)" });
        }
        const token = jwt.sign({ id: user.id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ message: "Login bem-sucedido", token });
    } catch (err) {
        res.status(500).json({ error: "Erro no login: " + err.message });
    }
});

// Middleware de Autenticação
const authMiddleware = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) return res.sendStatus(401);
    const token = auth.split(" ")[1];
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        res.sendStatus(403);
    }
};

// Rotas de Receitas (Públicas)
app.get('/recipes', async (req, res) => {
    try {
        const recipes = await prisma.recipe.findMany();
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar receitas." });
    }
});

app.get('/recipes/:id', async (req, res) => {
    try {
        const recipe = await prisma.recipe.findUnique({
            where: { id: req.params.id }
        });
        if (!recipe) {
            return res.status(404).json({ message: "Receita não encontrada." });
        }
        res.status(200).json(recipe);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar a receita." });
    }
});

// Rotas de Admin (Protegidas)
app.post('/admin/recipes', authMiddleware, async (req, res) => {
    try {
        const recipe = await prisma.recipe.create({
            data: {
                title: req.body.title,
                description: req.body.description,
                ingredients: req.body.ingredients,
                preparation: req.body.preparation,
                category: req.body.category,
                image: req.body.image,
                time: req.body.time,
                portions: req.body.portions,
                tag: req.body.tag
            }
        });
        res.status(201).json(recipe);
    } catch (err) {
        res.status(500).json({ error: "Erro ao criar receita." });
    }
});

app.put('/admin/recipes/:id', authMiddleware, async (req, res) => {
    try {
        await prisma.recipe.update({
            where: { id: req.params.id },
            data: req.body,
        });
        res.status(200).json({ message: "Receita editada com sucesso" });
    } catch (err) {
        res.status(500).json({ error: "Erro ao editar receita" });
    }
});

app.delete('/admin/recipes/:id', authMiddleware, async (req, res) => {
    try {
        await prisma.recipe.delete({
            where: { id: req.params.id }
        });
        res.status(200).json({ message: "Receita deletada com sucesso" });
    } catch (err) {
        res.status(500).json({ error: "Erro ao deletar receita" });
    }
});

app.listen(3000, '0.0.0.0', () => {
    console.log('Servidor rodando na porta 3000');
});