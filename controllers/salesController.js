const salesService = require('../services/salesService');

const getAll = async (req, res, next) => {
    try {
      const sales = await salesService.getAll();
      res.status(200).json(sales);
    } catch (err) {
      next(err);
    }
};

const findSalesById = async (req, res, next) => {
  try {
  const { id } = req.params;
  const sales = await salesService.findSalesById(id);

  res.status(200).json(sales);
  } catch (err) {
      next(err);
  }
};

module.exports = {
  getAll,
  findSalesById,
};