const productsService = require('../services/productsService');

const getAll = async (req, res) => {
    try {
      const products = await productsService.getAll();
      
      res.status(200).json(products);
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    getAll,
};