const camelize = require('camelize');
const salesModel = require('../models/sales.model');
const statusCode = require('../helpers/statusCode');
const errorMessages = require('../helpers/errorMessages');
const validations = require('../helpers/validations');

async function getAllSales() {
  const result = await salesModel.selectAllSales();

  if (!result) {
    return { status: statusCode.NOT_FOUND, message: { message: errorMessages.SALES_NOT_FOUND } };
  }

  return { status: statusCode.OK, message: camelize(result) };
}

async function getSalesById(id) {
  const result = await salesModel.selectSalesById(id);

  if (!result || result.length === 0) {
    return { status: statusCode.NOT_FOUND, message: { message: errorMessages.SALES_NOT_FOUND } };
  }

  return { status: statusCode.OK, message: camelize(result) };
}

async function insertNewSales(body) {
  const ErrorInRequiredKey = validations.arrayRequiredKey(body);
  if (ErrorInRequiredKey.status) { return ErrorInRequiredKey; }

  const idNotExistError = await validations.idsExist(body);
  if (idNotExistError.status) { return idNotExistError; }

  const insertedId = await salesModel.insertIntoSales();
  
  const promiseInsertSales = body.map(async (sale) => {
    await salesModel.insertIntoSalesProducts(insertedId, sale);
  });

  await Promise.all(promiseInsertSales);

  const result = { id: insertedId, itemsSold: body };

  return { status: statusCode.CREATED, message: result };
}

module.exports = {
  getAllSales,
  getSalesById,
  insertNewSales,
};