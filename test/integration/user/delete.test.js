const service = require('../../../src/controller/user')
const conexao = require('../../../src/config/database')

describe("Excluir pessoa", () => {

   beforeAll(async () => {
      this.transaction = await conexao.db.transaction();
   })

   afterAll(() => {
      this.transaction.rollback();
   })

   test("Adicionar uma pessoa", async () => {

      const { dataValues } = await service.deleteUser(1, this.transaction);
      expect(dataValues.name).toBe(dataTest.name)
      expect(dataValues.email).toBe(dataTest.email)
   })
})