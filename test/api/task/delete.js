const app = require('../../../src/index')
const request = require('supertest')

describe('TaskApi', () => {

        it('Deletar uma task', async () => {
             
            const response = await request(app)
            
            .delete('/api/task')
            .send(1);
 
            expect(response.statusCode).toBe(201);
            expect(response.body.title).toEqual(dataTest.title)
            expect(response.body.description).toEqual(dataTest.description)
            expect(response.body.status).toEqual(dataTest.status)
            expect(response.body.idProject).toEqual(dataTest.idProject)

        })
})

