const { errorMessages, statusCode } = require('../utils/errorMap');
const { createToken } = require('../utils/JWT');
const { User } = require('../models');

async function insertUser(body) {
  const { email } = body;
  
  const user = await User.findOne({ where: { email } });

  if (user) {
    return { status: statusCode.CONFLICT, message: { message: errorMessages.EXISTING_USER } };
  }

  await User.create(body);

  const token = createToken(email);
  return { status: statusCode.CREATED, message: { token } };
}

async function selectAllUsers() {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  return { status: statusCode.OK, message: users };
}

async function selectUserById(id) {
  const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });

  if (!user) {
    return { status: statusCode.NOT_FOUND, message: { message: errorMessages.USER_NOT_FOUND } };
  }

  return { status: statusCode.OK, message: user };
}

module.exports = {
  insertUser,
  selectAllUsers,
  selectUserById,
};