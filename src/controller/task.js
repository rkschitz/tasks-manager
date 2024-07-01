const Task = require('../model/task');
const Project = require('../model/project');

class TaskController {
    async createTask(title, description, status, idProject, transaction) {
        if (!title || !description || !idProject) {
            throw new Error('Título, descrição e id do projeto são obrigatórios');
        }

        if(title.length > 255) {
            throw new Error('Título deve ter no máximo 255 caracteres');
        }
        
        const project = await Project.findByPk(idProject);
        
        if (!project) {
            throw new Error('Projeto não encontrado');
        }

        const task = await Task.create({ title, description, status, idProject }, { transaction });

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

    async updateTask(id, title, description, status, idProject, finalDate, currentUser, transaction) {
        if (!id || !title || !description || !status || !currentUser) {
            throw new Error('Id, título, descrição, status e id do usuário são obrigatórios');
        }

        const task = await this.searchById(id);

        if (!task) {
            throw new Error('Tarefa não encontrada');
        }

        if (!idProject) {
            throw new Error('Id do projeto é obrigatório');
        }

        const project = await Project.findByPk(idProject);

        if (project.idUser !== currentUser) {
            throw new Error('Usuário não autorizado');
        }

        function transformDate(date) {
            const [day, month, year] = date.split('/');
            return new Date(year, month - 1, day);
        }

        task.title = title;
        task.description = description;
        task.status = status;
        task.finalDate = transformDate(finalDate)
        task.idProject = idProject;

        task.save({transaction});

        return task;
    }

    async deleteTask(id, currentUser, transaction) {
        if (!id || !currentUser) {
            throw new Error('Id da task e id do usuário são obrigatórios');
        }

        const task = await this.searchById(id);

        if (!task) {
            throw new Error('Tarefa não encontrada');
        }

        const project = await Project.findByPk(task.idProject);

        if (project.idUser !== currentUser) {
            throw new Error('Usuário não autorizado');
        }

        task.destroy({transaction});

        return "Tarefa deletada com sucesso"
    }

    async searchByProject(idProject) {
        if (!idProject) {
            throw new Error('Id do projeto é obrigatório');
        }

        return Task.findAll({ where: { idProject }})
        };


    async listTasks() {
        try {
             const tasks = await Task.findAll();
            return tasks;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async searchByStatus(status, currentUser) {
        if (!status) {
            throw new Error('Status é obrigatório');
        }

        const project = await Project.findAll({ where: { idUser: currentUser } });

        if (!project) {
            throw new Error('Projeto não encontrado');
        } 
        if (project.idUser !== currentUser) {
            throw new Error('Usuário não autorizado');
        } 

        return Task.findAll({ where: { status } });
    }
}

module.exports = new TaskController();