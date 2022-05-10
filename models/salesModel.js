const connection = require('./connection');

const getAll = async () => {
    const [result] = await connection.execute(`
    SELECT sa_p.sale_id AS saleId, sa_p.product_id AS productId, 
    sa_p.quantity, sa.date
    FROM sales_products AS sa_p
    JOIN sales AS sa ON sa_p.sale_id = sa.id
     `);

    return result;
};

const findSalesById = async (saleId) => {
    const [result] = await connection.execute(`
    SELECT sa_p.product_id AS productId, 
    sa_p.quantity, sa.date
    FROM sales_products AS sa_p
    JOIN sales AS sa ON sa_p.sale_id = sa.id
    WHERE sa_p.sale_id = ?
     `, [saleId]);

    return result;
};

module.exports = {
    getAll,
    findSalesById,
};