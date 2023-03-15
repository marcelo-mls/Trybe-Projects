const services = require('../services/user.service');

async function insertUser(req, res) {
  const result = await services.insertUser(req.body);

  res.status(result.status).json(result.message);
}

async function selectAllUsers(_req, res) {
  const result = await services.selectAllUsers();

  res.status(result.status).json(result.message);
}

async function selectUserById(req, res) {
  const { id } = req.params;
  const result = await services.selectUserById(id);

  res.status(result.status).json(result.message);
}

module.exports = {
  insertUser,
  selectAllUsers,
  selectUserById,
};
