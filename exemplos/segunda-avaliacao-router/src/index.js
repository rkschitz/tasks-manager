const express = require('express')
const cors = require('cors')
const database = require('./database/db')
const UserApi = require('./api/user')
const UserRouter = require('./routes/user')
const PostRouter = require('./routes/post')

const app = express()
app.use(express.json());

//Set use cors
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World' })
})

// Rotas sem token
app.post('/api/v1/login', UserApi.login)
app.post('/api/v1/user', UserApi.createUser)

// Rotas com token
app.use(UserApi.validateToken)
app.use('/api/v1/user', UserRouter)
app.use('/api/v1/post', PostRouter)

database.db.sync({ force: true })
    .then(_ => {
        app.listen(8000, _ => {
            console.log('Server running on port 8000')
        })
    })
    .catch(e => {
        console.error(`Erro ao inicializar o banco de dados ${e}`)
    })