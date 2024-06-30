const controller = require('../controller/task');
const controllerProject = require('../controller/project');

class TaskApi {
    async createTask(req, res) {
        const { title, description, idProject } = req.body;

        try {
            const task = await controller.createTask(title, description, idProject);
            return res.status(201).send(task);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async updateTask(req, res) {
        const { id } = req.params;
        const { title, description, idProject } = req.body;

        try {
            const task = await controller.updateTask(Number(id), title, description, idProject);
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

}

module.exports = new TaskApi();