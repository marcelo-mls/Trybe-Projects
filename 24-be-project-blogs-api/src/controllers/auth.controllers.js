const authService = require('../services/auth.service');

async function login(req, res) {
  const result = await authService.validateLogin(req.body);

  res.status(result.status).json(result.message);
}

module.exports = {
  login,
};