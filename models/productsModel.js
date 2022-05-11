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

const createProduct = async (name, quantity) => {
    const [result] = await connection.execute(`
    INSERT INTO products (name, quantity) VALUES (?, ?)
    `, [name, quantity]);

    return result;
};

const updateProduct = async (name, quantity, id) => {
    const [result] = await connection.execute(`
    UPDATE products SET name = ?, quantity = ?
    WHERE products.id = ?;`, [name, quantity, id]);

    return result;
};

const deleteProduct = async (id) => {
    const [result] = await connection.execute(`
    DELETE FROM products WHERE products.id = ?;`, [id]);

    return result;
};

module.exports = {
    getAll,
    findProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};