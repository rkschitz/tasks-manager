const app = require('../../../src/index')
const request = require('supertest')

describe('Update user', () => {

    beforeAll(async () => {
        console.log('Starting tests')
    })

    afterAll(async () => {
        console.log('Tests finished')
    })

    it('should update a user', async () => {
        const user = {
            name: 'Ruhan Kaio',
            email: 'ruhankaioNovo@gmail.com',
            password: '12345'
        }
        const response = await request(app)
            .put('/api/user/1')
            
            .send(user);

        expect(response.statusCode).toBe(200);
        expect(response.body.name).toEqual(user.name)
        expect(response.body.email).toEqual(user.email)
    })
}
)

