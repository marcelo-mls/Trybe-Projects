const { errorMessages, statusCode } = require('../utils/errorMap');
const { createToken } = require('../utils/JWT');
const { User } = require('../models');

async function validateLogin(body) {
  const { email, password } = body;
  
  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) {
    return {
      status: statusCode.BAD_REQUEST,
      message: { message: errorMessages.INVALID_FIELD }, 
    };
  }

  const token = createToken(email);
  return { status: statusCode.OK, message: { token } };
}

module.exports = {
  validateLogin,
};