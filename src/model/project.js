const database = require('../config/database');

class Post {
    constructor() {
        this.model = database.db.define('projects', {
            idProject: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: database.db.Sequelize.STRING
            },
            description: {
                type: database.db.Sequelize.STRING
            },
            idUser: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'id'
                }
            }
        });
    }
}

module.exports = (new Post).model;