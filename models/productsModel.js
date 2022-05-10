const connection = require('./connection');

const getAll = async () => {
    const [result] = await connection.execute(`
    SELECT * FROM products;
    `);

    return result;
};

const findProductById = async (productId) => {
    const [[result]] = await connection.execute(`
    SELECT * FROM products
    WHERE products.id = ?;
    `, [productId]);

    return result;
};

module.exports = {
    getAll,
    findProductById,
};