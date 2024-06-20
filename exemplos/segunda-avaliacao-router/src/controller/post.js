const post = require('../model/post')
const UserController = require('./user')

class postController {
    async createPost(titulo, conteudo, autorId) {
        if (titulo === undefined || conteudo === undefined || autorId === undefined) {
            throw new Error('Título, conteúdo e autorId são obrigatórios.')
        }

        await UserController.findUser(Number(autorId))

        const postValue = await post.create({
            titulo,
            conteudo,
            autorId
        })

        return postValue
    }

    async findPost(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório.')
        }

        const postValue = await post.findByPk(id)
        
        if (!postValue) {
            throw new Error('Postagem não encontrada.')
        }

        return postValue
    }

    async update(id, titulo, conteudo, autorId) {
        if (id === undefined || titulo === undefined || conteudo === undefined || autorId === undefined) {
            throw new Error('Título, conteúdo e autorId são obrigatórios.')
        }

        await UserController.findUser(autorId)

        const postValue = await this.findPost(id)

        postValue.titulo = titulo
        postValue.conteudo = conteudo
        postValue.autorId = autorId
        postValue.save()

        return postValue
    }

    async delete(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório.')
        }
        const postValue = await this.findPost(id)
        postValue.destroy()

        return
    }

    async find() {
        return post.findAll()
    }
} 

module.exports = new postController()