const controller = require('../controller/user');
const controllerProject = require('../controller/project');

class UserApi {
    async createUser(req, res) {
        const {name, email, password} = req.body;

        try {
            const user = await controller.createUser(name, email, password);
            return res.status(201).send(user);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async updateUser(req, res) {
        const { id } = req.params;
        const { name, email, password } = req.body;

        try {
            const user = await controller.updateUser(Number(id), name, email, password);
            return res.status(200).send(user);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async deleteUser(req, res) {
        const { id } = req.params;
    
        const userProject = await controllerProject.searchByUser(Number(id))

        if(userProject.length > 0) {
            return res.status(400).send({ error: 'Usuário possui projetos vinculados' })
        }

        try {
            await controller.deleteUser(Number(id));
            return res.status(204).send({ message: 'Usuário deletado com sucesso'});
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async listUsers(req, res) {
        try {
            const users = await controller.listUsers();
            return res.status(200).send(users);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const token = await controller.login(email, password);
            return res.status(200).send(token);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async validateToken(req, res, next) {
        const token = req.headers.authorization;

        try {
            await controller.validateToken(token);
            next();
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
}

module.exports = new UserApi();