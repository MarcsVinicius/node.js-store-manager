const { expect } = require("chai");
const sinon = require("sinon");
const productsModel = require("../../../models/productsModel");
const productsService = require("../../../services/productsService");

describe("Testa função getAll de services", () => {
  describe("Quando encontra produtos", () => {
    const data = [
      {
        id: 1,
        name: "produto A",
        quantity: 10,
      },
      {
        id: 2,
        name: "produto B",
        quantity: 15,
      },
    ];
    beforeEach(() => {
      sinon.stub(productsModel, "getAll").returns(data);
    });
    afterEach(() => productsModel.getAll.restore());

    it("retorna um array", async () => {
      const service = await productsService.getAll();
      expect(service).to.be.an("array");
    });
    it("retorna uma array de objetos com as chaves corretas", async () => {
      const service = await productsService.getAll();
      expect(service).to.be.an("array");
      expect(service[0]).to.have.all.keys(["id", "name", "quantity"]);
    });
  });
  describe("Quando não encontra nenhum produto", () => {
    const data = [];
    beforeEach(() => {
      sinon.stub(productsModel, "getAll").returns(data);
    });
    afterEach(() => productsModel.getAll.restore());

    it("retorna um array", async () => {
      const service = await productsService.getAll();
      expect(service).to.be.an("array");
    });
    it("a array deve ser vazia", async () => {
      const service = await productsService.getAll();
      expect(service).to.be.empty;
    });
  });
});

describe("Testa a função findProductsById de services", () => {
  describe("Quando o produto é encontrado", () => {
    const data = {
      id: 1,
      name: "Produto A",
      quantity: 10,
    };
    const id = 1;
    beforeEach(() => {
      sinon.stub(productsModel, "findProductById").returns(data);
    });
    afterEach(() => productsModel.findProductById.restore());
    it("A função deve retornar um objeto", async () => {
      const service = await productsService.findProductById(id);
      expect(service).to.be.an("object");
    });
    it("O Objeto retornado deve conter as chaves corretas", async () => {
      const service = await productsService.findProductById(id);
      expect(service).to.have.keys(["id", "name", "quantity"]);
    });
  });

  describe("Quando o não produto é encontrado", () => {
    const data = undefined;
    const id = 999;
    beforeEach(() => {
      sinon.stub(productsModel, "findProductById").returns(data);
    });
    afterEach(() => productsModel.findProductById.restore());
    it("A função deve retornar um objeto de erro", async () => {
      try {
        await productsService.findProductById(id);
      } catch (err) {
        expect(err).to.be.an("object");
      }
    });
    it("O objeto retornado da função deve ter status e message como chaves", async () => {
      try {
        await productsService.findProductById(id);
      } catch (err) {
        expect(err).to.have.keys(['status', 'message']);
      }
    });
  });
});

describe("Testa a função createProducts de services", () => {
  describe("Quando é criado com sucesso", () => {
    const data = [
      {
        id: 1,
        name: "Produto A",
        quantity: 10,
      }
    ]
    const name = "Produto B"
    const quantity = 13
    const insertDb = {
      insertId: 2
    }
    beforeEach(() => {
      sinon.stub(productsModel, 'getAll').returns(data);
      sinon.stub(productsModel, 'createProduct').returns(insertDb);
    })
    afterEach(() => {
      productsModel.getAll.restore();
      productsModel.createProduct.restore();
    })
    it("É retornado um objeto com a chaves corretas", async () => {
      const service = await productsService.createProduct(name, quantity);
      expect(service).to.have.keys(['id', 'name', 'quantity']);
    })
  })

  describe("Quando já existe um produto", () => {
    const data = [
      {
        id: 1,
        name: "Produto B",
        quantity: 10,
      }
    ]
    const name = "Produto B"
    const quantity = 10
    const insertDb = {
      insertId: 2
    }
    beforeEach(() => {
      sinon.stub(productsModel, 'getAll').returns(data);
    })
    afterEach(() => {
      productsModel.getAll.restore();
    })
    it("É retornado um objeto com a chaves corretas", async () => {
      try {
      const service = await productsService.createProduct(name, quantity);
      } catch (err) {
        expect(err).to.have.keys(["status", "message"])
      }
    })
  })
})
