const express = require('express')
const database = require('./config/database')
const UserApi = require('./api/user')
const UserRouter = require('./routes/user')
const ProjectRouter = require('./routes/project')
const TaskRouter = require('./routes/task')

const app = express()
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World' })
})

// Rotas sem token
app.post('/api/login', UserApi.login)
app.post('/api/user', UserApi.createUser)

// Rotas com token
// app.use(UserApi.validateToken)
app.use('/api/user', UserRouter)
app.use('/api/project', ProjectRouter)
app.use('/api/task', TaskRouter)

database.db.sync({ force: false })
    .then(_ => {
        if (process.env.NODE_ENV !== 'test' ) {
            app.listen(8000, _ => {
                console.log('Server running on port 8000')
            })
        }
    })
    .catch(e => {
        console.error(`Erro ao inicializar o banco de dados ${e}`)
    })

module.exports = app