const connection = require('./connection');

async function selectAllProducts() {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
}

async function selectProductById(id) {
  const [[result]] = await connection.execute(
    `
    SELECT * FROM StoreManager.products
    WHERE id = ?
    `, [id],
  );
  return result;
}

async function insertIntoProducts(name) {
  const [result] = await connection.execute(
    `INSERT INTO StoreManager.products (name)
    VALUES (?)
    `, [name],
  );
  return result.insertId;
}

async function updateProduct(name, id) {
  const [result] = await connection.execute(
    `UPDATE StoreManager.products
    SET name = ?
    WHERE id = ?
    `, [name, id],
  );
  return result.affectedRows;
}

async function deleteProduct(id) {
  const [result] = await connection.execute(
    `DELETE FROM StoreManager.products
    WHERE id = ?
    `, [id],
  );
  return result.affectedRows;
}

module.exports = {
  selectAllProducts,
  selectProductById,
  insertIntoProducts,
  updateProduct,
  deleteProduct,
};