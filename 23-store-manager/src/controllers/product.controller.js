const productsService = require('../services/products.service');

async function getAllProducts(_req, res) {
  const result = await productsService.getAllProducts();

  res.status(result.status).json(result.message);
}

async function getProductsById(req, res) {
  const { id } = req.params;
  const result = await productsService.getProductsById(id);

  res.status(result.status).json(result.message);
}

async function insertNewProduct(req, res) {
  const { name } = req.body;
  const result = await productsService.insertNewProduct(name);

  res.status(result.status).json(result.message);
}

async function updateProduct(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  const result = await productsService.updateProduct(name, id);

  res.status(result.status).json(result.message);
}

async function deleteProduct(req, res) {
  const { id } = req.params;
  const result = await productsService.deleteProduct(id);

  res.status(result.status).json(result.message);
}

module.exports = {
  getAllProducts,
  getProductsById,
  insertNewProduct,
  updateProduct,
  deleteProduct,
};