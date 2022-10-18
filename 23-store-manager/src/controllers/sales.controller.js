const salesService = require('../services/sales.service');

async function getAllSales(_req, res) {
  const result = await salesService.getAllSales();

  res.status(result.status).json(result.message);
}

async function getSalesById(req, res) {
  const { id } = req.params;
  const result = await salesService.getSalesById(id);

  res.status(result.status).json(result.message);
}

async function insertNewSales(req, res) {
  const result = await salesService.insertNewSales(req.body);

  res.status(result.status).json(result.message);
}

module.exports = {
  getAllSales,
  getSalesById,
  insertNewSales,
};