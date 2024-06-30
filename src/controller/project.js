const Project = require('../model/project');
const User = require('../model/user');
class ProjectController {
    async createProject(name, description, idUser) {
        if (!name || !description || !idUser) {
            throw new Error('Nome, descrição e id do usuário são obrigatórios');
        }

        const user = await User.findByPk(idUser);

        if (!user) {
            throw new Error('Usuário não encontrado');
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

    async updateProject(id, name, description, status, idUser) {
        if (!id|| !name || !description || !status || !idUser) {
            throw new Error('Id, nome, descrição, status e id do usuário são obrigatórios');
        }

        const project = await this.searchById(id);

        if(!project){
            throw new Error('Projeto não encontrado');
        }

        project.name = name;
        project.description = description;
        project.status = status;
        project.idUser = idUser;

        project.save();

        return project;
    }

    async deleteProject(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório');
        }

        const project = await this.searchById(id);

        if (!project) {
            throw new Error('Projeto não encontrado');
        }

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

module.exports = new ProjectController();