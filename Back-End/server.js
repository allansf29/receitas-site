import express from 'express'
import cors from 'cors'
import { PrismaClient } from './generated/prisma/index.js';

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173', 'http://192.168.1.108:5173'],
}))

// Criar receita
app.post('/recipes', async (req, res) => {
    await prisma.recipe.create({
        data: {
            title: req.body.title,
            description: req.body.description,
            ingredients: req.body.ingredients,
            preparation: req.body.preparation,
            category: req.body.category,
            image: req.body.image,
            time: req.body.time
        }
    })
    res.status(201).json(req.body)
})

// Atualizar receita
app.put('/recipes/:id', async (req, res) => {
    await prisma.recipe.update({
        where: {
            id: req.params.id
        },
        data: {
            title: req.body.title,
            description: req.body.description,
            ingredients: req.body.ingredients,
            preparation: req.body.preparation,
            category: req.body.category,
            image: req.body.image,
            time: req.body.time
        }
    })
    res.status(200).json("Receita editada com sucesso")
})

// Listar receitas
app.get('/recipes', async (req, res) => {
    let recipes = []
    if (req.query) {
        recipes = await prisma.recipe.findMany({
            where: {
                title: req.query.title,
                // outros filtros se quiser
            },
            orderBy: {
                order: 'asc'
            }
        })
    } else {
        recipes = await prisma.recipe.findMany()
    }
    res.status(200).json(recipes)
})

// Deletar receita
app.delete('/recipes/:id', async (req, res) => {
    await prisma.recipe.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json("Receita deletada com sucesso")
})


app.listen(3000, '0.0.0.0')
