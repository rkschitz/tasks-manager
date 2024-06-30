const app = require('../../../src/index')
const request = require('supertest')

describe('List', () => {
    
        beforeAll(async () => {
            console.log('Starting tests')
        })
    
        afterAll(async () => {
            console.log('Tests finished')
        })
    
        it('should list users', async () => {
            const response = await request(app)
                .get('/api/user')
    
            expect(response.statusCode).toBe(200);
        })
})