const app = require('../../../src/index')
const request = require('supertest')

describe('Delete user', () => {

    beforeAll(async () => {
        console.log('Starting tests')
    })

    afterAll(async () => {
        console.log('Tests finished')
    })

        it('Delete user', async () => {
            const response = await request(app)
            .delete('/api/user/1');
            console.log(response.body)
            expect(response.statusCode).toBe(204);
        })
})
