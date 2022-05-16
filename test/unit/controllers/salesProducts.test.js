const { expect } = require('chai');
const sinon = require('sinon');
const salesService = require('../../../services/salesService');
const salesController = require('../../../controllers/salesController');

describe("Testa a função GetAll", () => {
  describe("Quando há vendas na lista", () => {
    const data = [
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2
      }
    ] 
    const res = {}
    const req = {}
    beforeEach(() => {
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(data)

      sinon.stub(salesService, 'getAll').returns(data);
    })

    afterEach(() => salesService.getAll.restore())

    it("Testa se é retornado com status 200", async () => {
      await salesController.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it("testa se é retornado uma array", async () => {
      await salesController.getAll(req, res);
      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    })
  })

  describe("Quando não há vendas na lista", () => {
    const data = []
    const res = {}
    const req = {}
    beforeEach(() => {
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(data)

      sinon.stub(salesService, 'getAll').returns(data);
    })

    afterEach(() => salesService.getAll.restore())

    it("Testa se é retornado com status 200", async () => {
      await salesController.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it("testa se é retornado uma array", async () => {
      await salesController.getAll(req, res);
      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    })
  })
})