const controller = require('../controller/post');
const userController = require('../controller/user');

class PostApi {
    async criarPost(req, res) {
        const titulo = req.body.titulo
        const conteudo = req.body.conteudo;
        const autor = req.body.autor;
        
        try {
            await userController.buscarPorId(autor);
            const post = await controller.criarPost(titulo,conteudo,autor);
            return res.status(201).send(post);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async alterarPost(req, res) {
        const { id } = req.params;
        const { titulo, conteudo, autor } = req.body;
        
        try {
            await userController.buscarPorId(autor);
            const post = await controller.alterarPost(Number(id), titulo, conteudo, autor);
            return res.status(200).send(post);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async deletarPost(req, res) {
        const { id } = req.params;

        try {
            await controller.deletarPost(Number(id));
            return res.status(204).send();
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async listarPosts(req, res) {
        try {
            const users = await controller.listarPosts();
            return res.status(200).send(users);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async buscarPorId(req, res) {
        const { id } = req.params;

        try {
            const post = await controller.buscarPorId(Number(id));
            return res.status(200).send(post);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async buscarPorAutor(req, res) {
        const { id } = req.params;

        try {
            const post = await controller.buscarPorAutor(Number(id));
            return res.status(200).send(post);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
}

module.exports = new PostApi();