const { expect } = require("chai");
const sinon = require("sinon");
const salesModel = require("../../../models/salesModel");
const salesService = require("../../../services/salesService");

describe("Testa a função findSalesById de services", () => {
  describe("quando é encontrado uma venda", () => {
    const data = [
      {
        date: "2021-09-09T04:54:29.000Z",
        productId: 1,
        quantity: 2,
      },
      {
        date: "2021-09-09T04:54:54.000Z",
        productId: 2,
        quantity: 2,
      },
    ];
    const id = 1;
    beforeEach(() => {
      sinon.stub(salesModel, "findSalesById").returns(data);
    });
    afterEach(() => salesModel.findSalesById.restore());
    it("Retorna uma array", async () => {
      const service = await salesService.findSalesById(id);
      expect(service).to.be.an("array");
    });
    it("A array é de objetos e possui as chaves corretas", async () => {
      const service = await salesService.findSalesById(id);
      expect(service[0]).to.have.keys(["date", "productId", "quantity"]);
    });
  });

  describe("quando é encontrado uma venda", () => {
    const data = [];
    const id = 321;
    beforeEach(() => {
      sinon.stub(salesModel, "findSalesById").returns(data);
    });
    afterEach(() => salesModel.findSalesById.restore());
    it("Retorna um objeto de erro", async () => {
      try {
        await salesService.findSalesById(id);
      } catch (err) {
        expect(err).to.be.an('object');
      }
    });
  });
});
