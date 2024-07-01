
const Project = require('../model/project');
const User = require('../model/user');

class ProjectController {
    async createProject(name, description, idUser, transaction) {
        if (!name || !description || !idUser) {
            throw new Error('Nome, descrição e id do usuário são obrigatórios');
        }

        if(name.length > 255){
            throw new Error('Nome deve ter no máximo 255 caracteres');
        }

        const user = await User.findByPk(idUser);

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        const project = await Project.create({ name, description, idUser }, { transaction });

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

    async updateProject(id, name, description, idUser, currentUser, transaction) {

        if (!id|| !name || !description || !idUser || !currentUser) {
            throw new Error('Id, nome, descrição, id do responsável e id do usuario atual são obrigatórios');
        }

        const project = await this.searchById(id);

        if(!project){
            throw new Error('Projeto não encontrado');
        }

        if(project.idUser !== currentUser){
            throw new Error('Usuário não autorizado');
        }

        project.name = name;
        project.description = description;
        project.idUser = idUser;

        project.save({transaction});

        return project;
    }

    async deleteProject(id, currentUser, transaction) {
        if (id === undefined) {
            throw new Error('Id é obrigatório');
        }

        const project = await this.searchById(id);

        if (!project) {
            throw new Error('Projeto não encontrado');
        }

        if(project.idUser !== currentUser){
            throw new Error('Usuário não autorizado');
        }

        project.destroy({transaction});

        return "Projeto deletado com sucesso"
    }

    async searchByUser(idUser) {
        if (idUser === undefined) {
            throw new Error('Id do usuário é obrigatório');
        }

        const projects = await Project.findAll({ where: { idUser } });

        return projects;
    }

    async listProjects(currentUser) {
        return Project.findAll({where: {idUser: currentUser}});
    }

}

module.exports = new ProjectController();