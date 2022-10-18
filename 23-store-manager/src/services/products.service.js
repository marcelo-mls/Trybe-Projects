const productsModel = require('../models/products.model');
const statusCode = require('../helpers/statusCode');
const errorMessages = require('../helpers/errorMessages');

async function getAllProducts() {
  const result = await productsModel.selectAllProducts();

  if (!result) {
    return { status: statusCode.NOT_FOUND, message: errorMessages.NOT_FOUND };
  }

  return { status: statusCode.OK, message: result };
}

async function getProductsById(id) {
  const result = await productsModel.selectProductById(id);

  if (!result) {
    return { status: statusCode.NOT_FOUND, message: { message: errorMessages.NOT_FOUND } };
  }

  return { status: statusCode.OK, message: result };
}

async function insertNewProduct(name) {
  if (!name) {
    return { status: statusCode.BAD_REQUEST, message: { message: errorMessages.REQUIRED_NAME } };
  }

  if (name.length < 5) {
    return {
      status: statusCode.UNPROCESSABLE_ENTITY,
      message: { message: errorMessages.SHORT_NAME },
    };
  }

  const id = await productsModel.insertIntoProducts(name);
  const result = await productsModel.selectProductById(id);

  return { status: statusCode.CREATED, message: result };
}

async function updateProduct(name, id) {
  const product = await productsModel.selectProductById(id);

  if (!product) {
    return { status: statusCode.NOT_FOUND, message: { message: errorMessages.NOT_FOUND } };
  }

  if (!name) {
    return { status: statusCode.BAD_REQUEST, message: { message: errorMessages.REQUIRED_NAME } };
  }

  if (name.length < 5) {
    return {
      status: statusCode.UNPROCESSABLE_ENTITY,
      message: { message: errorMessages.SHORT_NAME },
    };
  }

  await productsModel.updateProduct(name, id);

  const result = await productsModel.selectProductById(id);

  return { status: statusCode.OK, message: result };
}

async function deleteProduct(id) {
  const result = await productsModel.selectProductById(id);

  if (!result) {
    return { status: statusCode.NOT_FOUND, message: { message: errorMessages.NOT_FOUND } };
  }

  await productsModel.deleteProduct(id);

  return { status: statusCode.NO_CONTENT, message: '' };
}

module.exports = {
  getAllProducts,
  getProductsById,
  insertNewProduct,
  updateProduct,
  deleteProduct,
};