const database = require('../config/database');

class User {
    constructor() {
        this.model = database.db.define('users', {
            idUser: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: database.db.Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: database.db.Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: database.db.Sequelize.STRING,
                allowNull: false
            }
        });
    }
}

module.exports = (new User).model;