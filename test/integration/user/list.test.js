const service = require('../../../src/controller/user')
const conexao = require('../../../src/config/database')

describe("Listar pessoas", () => {

   beforeAll(async () => {
      this.transaction = await conexao.db.transaction();
   })

   afterAll(() => {
      this.transaction.rollback();
   })

   test("Listar pessoas", async () => {
      const request = await service.listUsers()
      expect(request.length).toBeGreaterThan(0)
   })
})