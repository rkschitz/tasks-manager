const service = require('../../../src/controller/project')
const conexao = require('../../../src/config/database')

describe("Editar um projeto", () => {

   beforeAll(async () => {
      this.transaction = await conexao.db.transaction();
   })

   afterAll(() => {
      this.transaction.rollback();
   })

   test("Editar um projeto", async () => {
      const dataTest = {
         name: "Teste Editado AAA",
         description: "Descriçao Editada",
         idUser: 1
      }

      const { dataValues } = await service.updateProject(1,dataTest.name, dataTest.description, dataTest.idUser, 1, this.transaction)

      expect(dataValues.name).toBe(dataTest.name)
      expect(dataValues.description).toBe(dataTest.description)
      expect(dataValues.idUser).toBe(dataTest.idUser)
      
   })
})