const jwt = require('jsonwebtoken');

const createToken = (data) => {
  const token = jwt.sign(data, 'secret_key', {
    expiresIn: '7d',
    algorithm: 'HS256',
  });
  return token;
};

const validateToken = (token) => {
  const data = jwt.verify(token, 'secret_key');
  return data;
};

const validateTokenMiddleware = async (req, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization) { 
    const error = { status: 404, message: 'token is required' };
    throw error;
  }

  try {
    const data = jwt.verify(authorization, 'secret_key');
    return data;
  } catch (error) {
    console.log(error.message);
  }

  next();
};

module.exports = {
  createToken,
  validateToken,
  validateTokenMiddleware,
};
