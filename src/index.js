const express = require('express');
const userApi = require('./api/user');
const postApi = require('./api/post')
const database = require('./config/database');

console.log('Starting server....')
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send({ response: 'Hello World!' });
})
app.post('/login', userApi.login);
app.post('/users', userApi.criarUsuario);

// Aplica a validação do token para as rotas abaixo
app.use(userApi.validarToken);
app.get('/users', userApi.listarUsuario);
app.put('/users/:id', userApi.alterarUsuario);
app.delete('/users/:id', userApi.deletarUsuario);

app.get('/posts', postApi.listarPosts);
app.post('/posts', postApi.criarPost)
app.put('/posts/:id', postApi.alterarPost);
app.delete('/posts/:id', postApi.deletarPost);
app.get('/posts/:id', postApi.buscarPorId);
app.get('/posts/autor/:id', postApi.buscarPorAutor);

database.db.sync({ force: false })
    .then(() => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000')
        })
    })
    .catch((error) => {
        console.error('Error connecting to the database', error);
    });

