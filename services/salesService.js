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

const addSales = async (sales) => {
    const saleDate = await salesModel.addSaleDate();
    const { insertId } = saleDate;
    sales.forEach(async (sale) => {
        const { productId, quantity } = sale;
        const result = await salesModel.addSales(productId, quantity, insertId);

        return result;
    });
    return {
        id: insertId,
        itemsSold: sales,
    };
};

module.exports = {
    getAll,
    findSalesById,
    addSales,
};