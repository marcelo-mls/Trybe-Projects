const JWT = require('jsonwebtoken');
const { errorMessages, statusCode } = require('./errorMap');

async function loginValidation(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password || email.length === 0 || password.length === 0) {
    return res.status(statusCode.BAD_REQUEST).json({ message: errorMessages.MISSING_FIELDS });
  }

  return next();
}

async function displayNameValidation(req, res, next) {
  const { displayName } = req.body;

  if (displayName.length < 8) {
    return res.status(statusCode.BAD_REQUEST).json({ message: errorMessages.SHORT_DISPLAY_NAME });
  }

  return next();
}

async function emailValidation(req, res, next) {
  const { email } = req.body;
  const emailRegex = /\S+@\S+\.\S+/;

  if (!email || !emailRegex.test(email)) {
    return res.status(statusCode.BAD_REQUEST).json({ message: errorMessages.INVALID_EMAIL });
  }

  return next();
}

async function passwordValidation(req, res, next) {
  const { password } = req.body;

  if (password.length < 6) {
    return res.status(statusCode.BAD_REQUEST).json({ message: errorMessages.SHORT_PASSWORD });
  }

  return next();
}

async function tokenValidation(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(statusCode.UNAUTHORIZED).json({ message: errorMessages.MISSING_TOKEN });
  }

  try {
    JWT.verify(authorization, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(statusCode.UNAUTHORIZED).json({ message: errorMessages.INVALID_TOKEN });
  }

  return next();
}

async function categoryNameValidation(req, res, next) {
  const { name } = req.body;

  if (!name || name.length === 0) {
    return res.status(statusCode.BAD_REQUEST).json({ message: errorMessages.MISSING_NAME });
  }
  
  return next();
}

module.exports = {
  loginValidation,
  displayNameValidation,
  emailValidation,
  passwordValidation,
  tokenValidation,
  categoryNameValidation,
};