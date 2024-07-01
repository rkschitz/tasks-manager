const service = require('../../../src/controller/project')
const conexao = require('../../../src/config/database')

describe("Criar um projeto", () => {

   beforeAll(async () => {
      this.transaction = await conexao.db.transaction();
   })

   afterAll(() => {
      this.transaction.rollback();
   })

   test("Criar um projeto", async () => {
      const dataTest = {
         name: "Projeto",
         description: "Descriçao",
         idUser: 1
      }
      

      const { dataValues } = await service.createProject(dataTest.name, dataTest.description, dataTest.idUser, this.transaction)

      expect(dataValues.name).toBe(dataTest.name)
      expect(dataValues.description).toBe(dataTest.description)
      expect(dataValues.idUser).toBe(dataTest.idUser)

   })
})