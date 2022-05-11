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

const updateProduct = async (name, quantity, id) => {
  const findProductExists = await productsModel.getAll()
  .then((products) => products.find((product) => product.id === parseInt(id, 10)));
  if (!findProductExists) {
    const err = { status: 404, message: 'Product not found' };
    throw err;
  }
  const updatedProduct = async () => {
    const result = await productsModel.updateProduct(name, quantity, id);
    return result;
  };
  updatedProduct();
  return {
    id,
    name,
    quantity,
  };
};  

const deleteProduct = async (id) => {
  const findProductExists = await productsModel.getAll()
  .then((products) => products.some((product) => product.id === parseInt(id, 10)));
  console.log(findProductExists);
  if (!findProductExists) {
    const err = { status: 404, message: 'Product not found' };
    throw err;
  }
  const deletedProduct = async () => {
    const result = await productsModel.deleteProduct(id);
    return result;
  };
  await deletedProduct();
};  

module.exports = {
    getAll,
    findProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};