const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
const JWT_SECRET_KEY = 'batata';

class UserController {
    async createUser(name, email, password) {
        if (
            name === undefined
            || email === undefined
            || password === undefined
        ) {
            throw new Error('Nome, email e senha são obrigatórios');
        }

        const encryptedPassword = await bcrypt.hash(password, saltRounds);

        // INSERT INTO users (name, email, password) VALUES (name, email, password);
        const user = await User
            .create({ name, email, password: encryptedPassword });

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

    async changeUser(id, name, email, password) {
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

        user.save();

        return user;
    }

    async deleteUser(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório');
        }

        const user = await this.searchById(id);

        user.destroy();
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

        const jwtToken = jwt.sign({ id: user.id }, JWT_SECRET_KEY);

        return { token: jwtToken }
    }

    async validateToken(token) {
        try {
            const payload = jwt.verify(token, JWT_SECRET_KEY);
            return payload;
        } catch (error) {
            throw new Error('Token inválido');
        }
    }
}

module.exports = new UserController();