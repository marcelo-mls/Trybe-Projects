const { Product } = require('../database/models');

const getProducts = async () => {
  const products = await Product.findAll();
  return { status: 200, message: products };
};

module.exports = {
  getProducts,
};