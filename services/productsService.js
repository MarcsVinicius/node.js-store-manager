const productsModel = require('../models/productsModel');

const getAll = () => {
    const result = productsModel.getAll();
    
    return result;
};

module.exports = {
    getAll,
};