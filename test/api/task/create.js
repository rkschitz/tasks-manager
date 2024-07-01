const app = require('../../../src/index')
const request = require('supertest')

describe('TaskApi', () => {

        it('Criar uma task', async () => {
            const dataTest = {
                title: "Task",
                description: "Descriçao",
                status: "Em andamento",
                idProject: 1
             }
             
            const response = await request(dataTest)
            
            .post('/api/task')
            .send(dataTest);
 
            expect(response.statusCode).toBe(201);
            expect(response.body.title).toEqual(dataTest.title)
            expect(response.body.description).toEqual(dataTest.description)
            expect(response.body.status).toEqual(dataTest.status)
            expect(response.body.idProject).toEqual(dataTest.idProject)

        })
})

