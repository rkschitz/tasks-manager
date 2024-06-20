const express = require('express')

const app = express()

app.use(express.json())

const prateleiras = []

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/v1/shelf', (req, res) => {
    res.status(200).json(prateleiras)
})

app.post('/api/v1/shelf', (req, res) => {
    const { produto, preco, posicao } = req.body
    const prateleira = { produto, preco, posicao }
    prateleiras.push(prateleira)
    res.status(201).json(prateleira)
})

app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001')
})