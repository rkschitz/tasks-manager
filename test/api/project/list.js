const app = require('../../../src/index')
const request = require('supertest')

describe('ProjectApi', () => {

    it('should list projects', async () => {
        const response = await request(app)

            .get('/api/project')

        expect(response.statusCode).toBe(200);
        expect(response.body).toGreaterThan(0)

    })
})