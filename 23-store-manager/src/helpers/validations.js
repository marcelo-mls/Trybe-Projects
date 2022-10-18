const joi = require('joi');
const statusCode = require('./statusCode');
const productsModel = require('../models/products.model');

const saleSchema = joi.object({
  productId: joi.number().integer().min(1).required(),
  quantity: joi.number().integer().min(1).required(),
});

function getStatusCode(error) {
  return error.message.includes('is required')
    ? statusCode.BAD_REQUEST
    : statusCode.UNPROCESSABLE_ENTITY;
}

function simpleRequiredKey(sales) {
  const { error } = saleSchema.validate(sales);

  if (error) {
    return { status: getStatusCode(error), message: { message: error.message } };
  }

  return { status: null, message: null };
}

function arrayRequiredKey(sales) {
  const validatedKeys = sales.map((sale) => simpleRequiredKey(sale));
  const includesErrors = validatedKeys.find((key) => key.status);

  if (includesErrors) { return includesErrors; }

  return { status: null, message: null };
}

async function idsExist(sales) {
  const products = await productsModel.selectAllProducts();

  const productsId = products.map((product) => product.id);
  const allIdsExist = sales.every((sale) => productsId.includes(sale.productId));

  if (!allIdsExist) {
    return { status: statusCode.NOT_FOUND, message: { message: 'Product not found' } };
  }

  return { status: null, message: null };
}

module.exports = {
  arrayRequiredKey,
  idsExist,
};