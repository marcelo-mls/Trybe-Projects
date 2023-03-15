const { Sale, SaleProduct } = require('../database/models');

const createSale = async (body) => {
  const { totalPrice, deliveryAddress, deliveryNumber, saleDate, status,
    userId,
    sellerId,
    cart } = body;

  const sale = await Sale.create({ totalPrice: Number(totalPrice.toString().replace(',', '.')),
      deliveryAddress,
      deliveryNumber,
      saleDate,
      status,
      userId,
      sellerId });

  const cartMap = cart
  .map((product) => ({ saleId: sale.id, productId: product.id, quantity: product.quantity }));

  await SaleProduct.bulkCreate(cartMap);
  
  return { status: 201, message: sale };
};

const getAllSales = async () => {
  const products = await Sale.findAll();
  return { status: 200, message: products };
};

module.exports = {
  createSale,
  getAllSales,
};
