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
  const [result] = await connection.execute(
    `
    SELECT sa_p.product_id AS productId, 
    sa_p.quantity, sa.date
    FROM sales_products AS sa_p
    JOIN sales AS sa ON sa_p.sale_id = sa.id
    WHERE sa_p.sale_id = ?
     `,
    [saleId],
  );

  return result;
};

const addSaleDate = async () => {
  const [result] = await connection.execute(`
    INSERT INTO sales (date) VALUES (now())
    `);

  return result;
};

const addSales = async (productId, quantity, saleId) => {
  const [result] = await connection.execute(
    `
    INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (? ,?, ?)
    `,
    [saleId, productId, quantity],
  );

  return {
    result,
  };
};

const updateSales = async (productId, quantity, saleId) => {
  const [result] = await connection.execute(
    `
    UPDATE sales_products
    SET quantity = ?, product_id = ?
    WHERE sale_id = ?`,
    [quantity, productId, saleId],
  );

  return result;
};

module.exports = {
  getAll,
  findSalesById,
  addSales,
  addSaleDate,
  updateSales,
};
