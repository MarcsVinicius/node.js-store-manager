const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');

describe("Testa função getAll", () => {
  describe("Quando há produtos na lista", () => {
    const productsMock = [
      {
        "id": 1,
        "name": "Produto A",
        "quantity": 10,
      },
      {
        "id": 2,
        "name": "Produto B",
        "quantity": 2,
      }
    ];
    const res = {};
    const req = {};
    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(productsMock);

      sinon.stub(productsService, 'getAll').resolves(productsMock);
    })
    
    afterEach(() => productsService.getAll.restore())

    it('O res deve ser status 200', async () => {
      await productsController.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    })

    it('O json deve ser uma array', async () => {
      await productsController.getAll(req, res);
      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    })
  });

  describe("Quando não há nenhum produto na lista", () => {
    const res = {};
    const req = {};
    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns([]);

      sinon.stub(productsService, 'getAll').resolves([]);
    })
    
    afterEach(() => productsService.getAll.restore())

    it('O res deve ser status 200', async () => {
      await productsController.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    })

    it('O json deve ser uma array', async () => {
      await productsController.getAll(req, res);
      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    })
  });
});

describe("Testa função findProductById", () => {
  describe("Quando há produto na lista", () => {
    const productMock = {
      "id": 1,
      "name": "Produto A",
      "quantity": 10
    }
    const req = {
      params: 1
    }
    const res = {}

    beforeEach(() => {
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(productMock)

      sinon.stub(productsService, 'findProductById').resolves(productMock);
    })

    afterEach(() => productsService.findProductById.restore())

    it('Testa se o status retornado é 200', async () => {
      await productsController.findProductById(req, res)
      expect(res.status.calledWith(200)).to.be.equal(true)
    })
    it('Testa se o json é um objeto', async () => {
      await productsController.findProductById(req,res)
      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true)
    })
  })
  describe("Quando não há um produto na lista", () => {
    const errorProduct = { "message": "Product not found" }
    const req = {
      params: 99999
    }
    const res = {}
    const next = sinon.stub().returns();
    beforeEach(() => {
      req.params = sinon.stub().returns(req)
      res.status = sinon.stub().returns(res)

      sinon.stub(productsService, 'findProductById').throws(errorProduct);
    })

    afterEach(() => productsService.findProductById.restore())

    it('Retorna status 404', async () => {
      await productsController.findProductById(req, res, next)
      expect(next.calledWith(errorProduct)).to.be.equal(true)
    })
  })
})
