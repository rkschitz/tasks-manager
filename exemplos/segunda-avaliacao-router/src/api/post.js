const PostController = require('../controller/post')

class PostApi {
    async createPost(req, res) {
        const { titulo, conteudo, autorID } = req.body

        try {
            const post = await PostController.createPost(titulo, conteudo, autorId)
            return res.status(201).send(post)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao criar postagem ${e.message}`})
        }
    }

    async updatePost(req, res) {
        const { id } = req.params
        const { titulo, conteudo, autorId } = req.body

        try {
            const post = await PostController.update(Number(id), titulo, conteudo, autorId)
            return res.status(200).send(post)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao alterar postagem ${e.message}`})
        }
    }

    async deletePost(req, res) {
        const { id } = req.params

        try {
            await PostController.delete(Number(id))
            return res.status(204).send()
        } catch (e) {
            return res.status(400).send({ error: `Erro ao deletar postagem ${e.message}`})
        }
    }

    async findPosts(req, res) {
        try {
            const posts = await PostController.find()
            return res.status(200).send(posts)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao listar postagens ${e.message}`})
        }
    }
}

module.exports = new PostApi()