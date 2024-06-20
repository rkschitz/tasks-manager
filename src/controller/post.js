const Post = require('../model/post');

class UserController {
    async criarPost(titulo, conteudo, autor) {
        if (
            titulo === undefined
            || conteudo === undefined
            || autor === undefined
        ) {
            throw new Error('Título, conteúdo e autor são obrigatórios');
        }

        const post = await Post .create({ titulo, conteudo, autor });

        return post
    }

    async buscarPorId(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório');
        }

        const post = await Post.findByPk(id);

        if (!post) {
            throw new Error('Post não encontrado');
        }

        return post;
    }

    async alterarPost(id, titulo, conteudo, autor) {
        if (
            id === undefined
            || titulo === undefined
            || conteudo === undefined
            || autor === undefined
        ) {
            throw new Error('Id, título, conteúdo e autor são obrigatórios');
        }

        const post = await this.buscarPorId(id);

        post.titulo = titulo;
        post.conteudo = conteudo;
        post.autor = autor;

        post.save();

        return post;
    }

    async deletarPost(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório');
        }

        const post = await this.buscarPorId(id);

        post.destroy();
    }

    async listarPosts() {
        return Post.findAll();
    }

    async buscarPorAutor(autor) {
        if (autor === undefined) {
            throw new Error('Autor é obrigatório');
        }

        return Post.findAll({ where: { autor } });
    }
}

module.exports = new UserController();