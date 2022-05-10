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

module.exports = {
    getAll,
    findProductById,
};