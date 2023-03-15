const { validateToken } = require('../utils/jwt.utils');

const validate = (token) => {
  try {
    validateToken(token);
    return { status: 200, message: true };
  } catch (error) {
    return { status: 401, message: false };
  }
};

module.exports = {
  validate,
};