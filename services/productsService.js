const productsModel = require('../models/productsModel');

const getAll = () => {
    const result = productsModel.getAll();
    
    return result;
};

const findProductById = async (productId) => {
      const result = await productsModel.findProductById(productId);

    if (result === undefined) {
      const err = { status: 404, message: 'Product not found' };
      throw err;
    }

    return result;
};

const createProduct = async (name, quantity) => {
  const allProducts = await productsModel.getAll()
  .then((products) => products.some((product) => product.name === name));
  if (allProducts) {
    const err = { status: 409, message: 'Product already exists' };
    throw err;
  }
  
  const { insertId } = await productsModel.createProduct(name, quantity);

  return {
    id: insertId,
    name,
    quantity,
  };
};

module.exports = {
    getAll,
    findProductById,
    createProduct,
};