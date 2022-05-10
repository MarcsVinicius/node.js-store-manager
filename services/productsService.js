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

module.exports = {
    getAll,
    findProductById,
};