const productsService = require('../service/products.service');

const getProducts = async (req, res) => {
  const { status, message } = await productsService.getProducts();
  return res.status(status).json(message);
};

module.exports = {
  getProducts,
};
