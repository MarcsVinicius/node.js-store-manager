const productsService = require('../services/productsService');

const getAll = async (req, res, next) => {
    try {
      const products = await productsService.getAll();
      
      res.status(200).json(products);
    } catch (err) {
        next(err);
    }
};

const findProductById = async (req, res, next) => {
    try {
    const { id } = req.params;
    const products = await productsService.findProductById(id);

    res.status(200).json(products);
    } catch (err) {
        next(err);
    }
};

const createProduct = async (req, res, next) => {
    try {
      const { name, quantity } = req.body;
      const createdProduct = await productsService.createProduct(name, quantity);

    return res.status(201).json(createdProduct);
    } catch (err) {
      next(err);
    }
};

const updateProduct = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;
    const updatedProduct = await productsService.updateProduct(name, quantity, id);

    return res.status(200).json(updatedProduct);
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = async () => {
      await productsService.deleteProduct(id);
    };
    await deletedProduct();
    
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};
module.exports = {
    getAll,
    findProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};