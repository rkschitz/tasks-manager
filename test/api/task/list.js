const app = require('../../../src/index')
const request = require('supertest')

describe('TaskApi', () => {

    it('Listar tasks', async () => {

        const response = await request(app)

            .get('/api/task')

        expect(response.statusCode).toBe(200);
        expect(response.body).toGreaterThan(0)

    })
})

