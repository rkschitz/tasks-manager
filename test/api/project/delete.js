const app = require('../../../src/index')
const request = require('supertest')

describe('ProjectApi', () => {

    it('should delete a project', async () => {
        const response = await request(app)

            .post('/api/project')
            .send(1);
        expect(response.statusCode).toBe(204);
    })
}
)