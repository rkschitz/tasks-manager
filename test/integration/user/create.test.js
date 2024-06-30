const service = require('../../../src/controller/user')
const conexao = require('../../../src/config/database')

describe("Adicionar pessoa", () => {

   beforeAll(async () => {
      this.transaction = await conexao.db.transaction();
   })

   afterAll(() => {
      this.transaction.rollback();
   })

   test("Adicionar uma pessoa", async () => {
      const dataTest = {
         name: "Teste",
         email: "teste@teste.com",
         password: "12345678"
      }

      const { dataValues } = await service.createUser(dataTest.name, dataTest.email, dataTest.password, this.transaction);

      expect(dataValues.name).toBe(dataTest.name)
      expect(dataValues.email).toBe(dataTest.email)
   })
})