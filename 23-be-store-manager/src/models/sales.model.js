const connection = require('./connection');

async function selectAllSales() {
  const [result] = await connection.execute(
    `SELECT sale_id
      , date
      , product_id
      , quantity
    FROM StoreManager.sales s
    JOIN StoreManager.sales_products sp ON s.id = sp.sale_id
    ORDER BY 1, 3`,
  );
  return result;
}

async function selectSalesById(id) {
  const [result] = await connection.execute(
    `SELECT date
      , product_id
      , quantity
    FROM StoreManager.sales s
    JOIN StoreManager.sales_products sp ON s.id = sp.sale_id
    WHERE sale_id = ?
    ORDER BY 1, 3
  `, [id],
  );
  return result;
}

async function insertIntoSales() {
  const [result] = await connection.execute(
    `INSERT INTO StoreManager.sales (date)
    VALUES (now())
    `,
  );
  return result.insertId;
}

async function insertIntoSalesProducts(id, body) {
  await connection.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?)
    `, [id, body.productId, body.quantity],
  );
}

module.exports = {
  selectAllSales,
  selectSalesById,
  insertIntoSales,
  insertIntoSalesProducts,
};