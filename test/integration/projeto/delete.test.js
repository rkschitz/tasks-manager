const service = require('../../../src/controller/project')
const conexao = require('../../../src/config/database')

describe("Deletar um projeto", () => {

   beforeAll(async () => {
      this.transaction = await conexao.db.transaction();
   })

   afterAll(() => {
      this.transaction.rollback();
   })

   test("Deletar um projeto", async () => {

    const dataTest = {
        idProject: 1,
        currentUser: 1
    }   

    const request = await service.deleteProject(dataTest.idProject, dataTest.currentUser, this.transaction);

    expect(request).toBe("Projeto deletado com sucesso");
      
   })
})