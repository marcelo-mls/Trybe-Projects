const { statusCode } = require('../utils/errorMap');
const { Category } = require('../models');

async function insertCategory(body) {
  const category = await Category.create(body);

  return { status: statusCode.CREATED, message: category };
}

async function selectAllCategories() {
  const categories = await Category.findAll();

  return { status: statusCode.OK, message: categories };
}

module.exports = {
  insertCategory,
  selectAllCategories,
};