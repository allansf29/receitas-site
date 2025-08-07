import express from 'express'
import { PrismaClient } from './generated/prisma/index.js';

const prisma = new PrismaClient()

const app = express()
app.use(express.json())


//criar
app.post('/usuarios', async (req, res) => {

    await prisma.user.create({
        data: {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        }
    })

    res.status(201).json(req.body)
})

//atualizar
app.put('/usuarios/:id', async (req, res) => {
    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        }
    })
    console.log(req)

    res.status(200).json("Usuário editado com sucesso")
})

//listar todos usuarios
app.get('/usuarios', async (req, res) => {

    let users = []

    if (req.query) {
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age ? Number(req.query.age) : undefined,
            }
        })
    } else {
        users = await prisma.user.findMany()
    }
    
    res.status(200).json(users)

})

//deletar
app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json("Usuário deletado com sucesso")
})


app.listen(3000)





//allansf29
//bOZvGK39R9cShK4U