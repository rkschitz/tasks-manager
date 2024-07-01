const app = require('../../../src/index')
const request = require('supertest')

describe('ProjectApi', () => {

    it('should create a project', async () => {
        const project = {
            name: 'Project 1',
            description: 'Description project 1',
            status: 'pendente'
        }
        const response = await request(app)

            .post('/api/project')
            .send(project);

        expect(response.statusCode).toBe(201);
        expect(response.body.name).toEqual(project.name)
        expect(response.body.description).toEqual(project.description)
        expect(response.body.status).toEqual(project.status)
    })
}
)