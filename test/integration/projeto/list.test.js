const service = require('../../../src/controller/project')
const conexao = require('../../../src/config/database')

describe("Listar projetos", () => {

   beforeAll(async () => {
      this.transaction = await conexao.db.transaction();
   })

   afterAll(() => {
      this.transaction.rollback();
   })

   test("Listar projetos", async () => {
      const request = await service.listProjects(1)
      expect(request.length).toBeGreaterThan(0)
   })
})