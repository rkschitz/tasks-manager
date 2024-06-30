const app = require('../../../src/index')
const request = require('supertest')

describe('UserApi', () => {

    afterAll(async () => {

    })
        it('should create a user', async () => {
            const user = {
                name: 'Ruhan',
                email: 'ruhankaio90000@gmail.com',
                password: '12345'
            }
            const response = await request(app)
            .post('/api/user')
            .send(user);
 
            expect(response.statusCode).toBe(201);
            expect(response.body.name).toEqual(user.name)
            expect(response.body.email).toEqual(user.email)
        })
})

