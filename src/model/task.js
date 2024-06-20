const database = require('../config/database');

class User {
    constructor() {
        this.model = database.db.define('tasks', {
            idTask: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: database.db.Sequelize.STRING
            },
            description: {
                type: database.db.Sequelize.STRING
            },
            status: {
                type: database.db.Sequelize.STRING
            },
            finalDate: {
                type: database.db.Sequelize.DATE
            },
            idProject: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: 'projects',
                    key: 'idProject'
                }
            }
        });
    }
}

module.exports = (new User).model;