const controller = require('../controller/task');
const controllerProject = require('../controller/project');

class TaskApi {
    async createTask(req, res) {
        const { title, description, status, idProject } = req.body;

        try {
            const task = await controller.createTask(title, description, status, idProject);
            return res.status(201).send(task);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async updateTask(req, res) {
        const currentUser = req.currentUser;
        const { id } = req.params;
        const { title, description, status, idProject, finalDate } = req.body;

        try {
            const task = await controller.updateTask(Number(id), title, description, status, idProject, finalDate, currentUser);
            return res.status(200).send(task);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async deleteTask(req, res) {
        const { id } = req.params;

        try {
            await controller.deleteTask(Number(id));
            return res.status(204).send({ message: 'Tarefa deletada com sucesso' });
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async listTasks(req, res) {
        try {
            const tasks = await controller.listTasks();
            return res.status(200).send(tasks);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async searchById(req, res) {
        const { id } = req.params;

        try {
            const task = await controller.searchById(Number(id));
            return res.status(200).send(task);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async searchByStatus(req, res) {
        const { status } = req.query;

        try {
            const tasks = await controller.searchByStatus(status);
            return res.status(200).send(tasks);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async searchByProject(req, res) {
        const { idProject } = req.params;
        const currentUser = req.currentUser;

        try {
            const project = await controllerProject.searchById(idProject);

            if(!project) {
                throw new Error('Projeto não encontrado');
            }

            if(project.idUser !== currentUser) {
                throw new Error('Usuário não autorizado');
            }

            const tasks = await controller.searchByProject(idProject);
            return res.status(200).send(tasks);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

}

module.exports = new TaskApi();