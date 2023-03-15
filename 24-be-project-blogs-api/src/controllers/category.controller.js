const categoryService = require('../services/category.service');

async function insertCategory(req, res) {
  const result = await categoryService.insertCategory(req.body);

  res.status(result.status).json(result.message);
}

async function selectAllCategories(_req, res) {
  const result = await categoryService.selectAllCategories();

  res.status(result.status).json(result.message);
}

module.exports = {
  insertCategory,
  selectAllCategories,
};