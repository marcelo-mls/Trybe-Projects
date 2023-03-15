const validateTokenService = require('../service/validateToken.service');

const validate = async (req, res) => {
  const { token } = req.body;

  const { status, message } = await validateTokenService.validate(token);

  return res.status(status).json(message);
};

module.exports = {
  validate,
};
