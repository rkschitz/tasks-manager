const controller = require('../controller/project');
const controllerTask = require('../controller/task');

class ProjectApi {

    async createProject(req, res) {
        const { name, description, idUser } = req.body;

        try {
            const project = await controller.createProject(name, description, idUser);
            return res.status(201).send(project);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async updateProject(req, res) {
        const currentUser = req.currentUser;
        const { id } = req.params;
        const { name, description, idUser } = req.body;

        try {

            const project = await controller.updateProject(Number(id), name, description, idUser, currentUser);
            return res.status(200).send(project);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async deleteProject(req, res) {
        const currentUser = req.currentUser;
        const { id } = req.params;

        const projectTask = await controllerTask.searchByProject(Number(id))

        if(projectTask.length > 0) {
            return res.status(400).send({ error: 'Projeto possui tarefas vinculadas' })
        }

        try {
            await controller.deleteProject(Number(id), currentUser);
            return res.status(204).send();
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async listProjects(req, res) {
        const currentUser = req.currentUser;
        try {
            const projects = await controller.listProjects(currentUser);
            return res.status(200).send(projects);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async searchById(req, res) {
        const { id } = req.params;

        try {
            const project = await controller.searchById(Number(id));
            return res.status(200).send(project);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async searchByUser(req, res) {
        const { idUser } = req.params;

        try {
            const projects = await controller.searchByUser(Number(idUser));
            return res.status(200).send(projects);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async listTasks(req, res) {
        const { id } = req.params;

        try {
            const tasks = await controllerTask.searchByProject(Number(id));
            return res.status(200).send(tasks);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

}

module.exports = new ProjectApi();