const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
const JWT_SECRET_KEY = 'batata';

class UserController {
    async createUser(name, email, password, transaction) {
        if (
            name === undefined
            || email === undefined
            || password === undefined
        ) {
            throw new Error('Nome, email e senha são obrigatórios');
        }

        const encryptedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = {
            name,
            email,
            password: encryptedPassword
        }

        const user = await User
            .create(newUser, {transaction});

        return user;
    }

    async searchById(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório');
        }

        const user = await User.findByPk(id);

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        return user;
    }

    async changeUser(id, name, email, password, transaction) {
        if (
            id === undefined
            || name === undefined
            || email === undefined
            || password === undefined
        ) {
            throw new Error('Id, nome, email e senha são obrigatórios');
        }

        const user = await this.searchById(id);

        user.name = name;
        user.email = email;

        const encryptedPassword = await bcrypt.hash(password, saltRounds);
        user.password = encryptedPassword;

        user.save({transaction});

        return user;
    }

    async deleteUser(id, transaction) {
        if (id === undefined) {
            throw new Error('Id é obrigatório');
        }

        const user = await this.searchById(id);

        user.destroy({transaction});
        return "Usuário deletado com sucesso"
    }

    async listUsers() {
        return User.findAll();
    }

    async login(email, password) {
        if (!email || !password) {
            throw new Error('Email e senha são obrigatórios');
        }

        const user = await User.findOne({ where: { email }});

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            throw new Error('Senha inválida');
        }

        const jwtToken = jwt.sign({ idUser: user.idUser }, JWT_SECRET_KEY);

        return { token: jwtToken }
    }

    // async validateToken(token) {
    //     try {
    //         const payload = jwt.verify(token, JWT_SECRET_KEY);
    //         return payload;
    //     } catch (error) {
    //         throw new Error('Token inválido');
    //     }
    // }
}

module.exports = new UserController();