const salesModel = require('../models/salesModel');

const getAll = async () => {
    const result = await salesModel.getAll();

    return result;
};

const findSalesById = async (salesId) => {
    const result = await salesModel.findSalesById(salesId);

    if (result.length === 0) {
     const err = { status: 404, message: 'Sale not found' };
     throw err;
    }

    return result;
};

module.exports = {
    getAll,
    findSalesById,
};