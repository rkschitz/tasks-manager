const Project = require('../model/project');

class ProjectController {
    async createProject(name, description, idUser) {
        if (name === undefined || description === undefined || idUser === undefined) {
            throw new Error('Nome, descrição e id do usuário são obrigatórios');
        }

        const project = await Project.create({ name, description, idUser });

        return project;
    }

    async searchById(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório');
        }

        const project = await Project.findByPk(id);

        if (!project) {
            throw new Error('Projeto não encontrado');
        }

        return project;
    }

    async changeProject(id, name, description, idUser) {
        if (id === undefined || name === undefined || description === undefined || idUser === undefined) {
            throw new Error('Id, nome, descrição e id do fusuário são obrigatórios');
        }

        const project = await this.searchById(id);

        project.name = name;
        project.description = description;
        project.idUser = idUser;

        project.save();

        return project;
    }

    async deleteProject(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório');
        }

        const project = await this.searchById(id);

        project.destroy();
    }

    async searchByUser(idUser) {
        if (idUser === undefined) {
            throw new Error('Id do usuário é obrigatório');
        }

        const projects = await Project.findAll({ where: { idUser } });

        return projects;
    }

    async listProjects() {
        return Project.findAll();
    }

}