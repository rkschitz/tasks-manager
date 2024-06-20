const database = require('../database/db')

class User {
    constructor() {
        this.model = database.db.define('users', {
            id: { 
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: database.db.Sequelize.STRING
            },
            email: {
                type: database.db.Sequelize.STRING
            },
            senha: {
                type: database.db.Sequelize.STRING
            }
        })
    }
}

module.exports = (new User()).model