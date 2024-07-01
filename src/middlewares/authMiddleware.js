const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = 'batata';

class AuthMiddleware {
    async validateToken(req, res, next) {
        const token = req.headers.authorization;

        try {
            if(!token) {
                throw new Error('Token não informado');
            }

            const payload = jwt.verify(token, JWT_SECRET_KEY);

            if(!payload) {
                throw new Error('Token inválido');
            }

            req.currentUser = payload.idUser;

            next();
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
}

module.exports = AuthMiddleware