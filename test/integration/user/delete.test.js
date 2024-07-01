const service = require('../../../src/controller/user')
const conexao = require('../../../src/config/database');
const e = require('express');

describe("Excluir pessoa", () => {

   beforeAll(async () => {
      this.transaction = await conexao.db.transaction();
   })

   afterAll(() => {
      this.transaction.rollback();
   })

   test("Deletar uma pessoa", async () => {

   

      const request = await service.deleteUser(1, this.transaction);
      expect(request).toBe("Usuário deletado com sucesso");
      
   })
})