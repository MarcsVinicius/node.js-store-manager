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

const updateSales = async (sales, saleToUpdate) => {
    console.log(saleToUpdate);
    await sales.forEach(async (sale) => {
        const { productId, quantity } = sale;
        if (quantity >= 1) {
        const result = await salesModel.updateSales(productId, quantity, saleToUpdate);

        return result;
        } 
            const err = { message: 'quantity must be greater than zero' };
            throw err;
    });

    return {
        saleId: saleToUpdate,
        itemUpdated: sales,
    };
};

module.exports = {
    getAll,
    findSalesById,
    addSales,
    updateSales,
};