const Task = require('../model/task');
const Project = require('../model/project');

class TaskController {
    async createTask(title, description, idProject) {
        if (!title || !description || !idProject) {
            throw new Error('Título, descrição e id do projeto são obrigatórios');
        }

        const project = await Project.findByPk(idProject);

        if (!project) {
            throw new Error('Projeto não encontrado');
        }

        let status = 'Pendente'

        const task = await Task.create({ title, description, status, idProject });

        return task;
    }

    async searchById(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório');
        }

        const task = await Task.findByPk(id);

        if (!task) {
            throw new Error('Tarefa não encontrada');
        }

        return task;
    }

    async updateTask(id, title, description, idProject) {
        if (id === undefined || title === undefined || description === undefined || idProject === undefined) {
            throw new Error('Id, título, descrição e id do projeto são obrigatórios');
        }

        const task = await this.searchById(id);

        if (!task) {
            throw new Error('Tarefa não encontrada');
        }

        task.title = title;
        task.description = description;
        task.idProject = idProject;

        task.save();

        return task;
    }

    async deleteTask(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório');
        }

        const task = await this.searchById(id);

        if (!task) {
            throw new Error('Tarefa não encontrada');
        }

        task.destroy();
    }

    async searchByProject(idProject) {
        if (!idProject) {
            throw new Error('Id do projeto é obrigatório');
        }

        return Task.findAll({ where: { idProject } });
    }

    async searchByUser(idUser) {
        if (idUser === undefined) {
            throw new Error('Id do usuário é obrigatório');
        }

        const projects = await Project.findAll({ where: { idUser } });

        const tasks = await Task.findAll({ where: { idProject: projects.map(project => project.id) } });

        return tasks;
    }

    async listTasks() {
        try{
            const tasks = await Task.findAll();
            return tasks;
        }catch(error){
            throw new Error(error.message);
        }
    }
}

module.exports = new TaskController();