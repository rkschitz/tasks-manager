const service = require('../../../src/controller/task')
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
        id: 1,
        currentUser: 1
    }   

    const request = await service.deleteTask(dataTest.id, dataTest.currentUser, this.transaction);

    expect(request).toBe("Tarefa deletada com sucesso");
      
   })
})