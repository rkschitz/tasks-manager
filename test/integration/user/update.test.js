const service = require('../../../src/controller/user')
const conexao = require('../../../src/config/database')

describe("Editar pessoa", () => {

   beforeAll(async () => {
      this.transaction = await conexao.db.transaction();
   })

   afterAll(() => {
      this.transaction.rollback();
   })

   test("Editar uma pessoa", async () => {
      const dataTest = {
         name: "Teste Editado",
         email: "teste@teste.com Editado",
         password: "12345678 Editado"
      }

      const { dataValues } = await service.changeUser(1,dataTest.name, dataTest.email, dataTest.password, this.transaction);

      expect(dataValues.name).toBe(dataTest.name)
      expect(dataValues.email).toBe(dataTest.email)
      
   })
})