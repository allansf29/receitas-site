import express from 'express'
import { PrismaClient } from './generated/prisma/index.js';

const prisma = new PrismaClient()

const app = express()
app.use(express.json())


app.post('/recipes', async (req, res) => {
    await prisma.recipe.create({
        data: {
            title: req.body.title,
            description: req.body.description,
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


app.listen(3000)
