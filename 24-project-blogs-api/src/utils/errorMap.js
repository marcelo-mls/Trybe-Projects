const errorMessages = {
  MISSING_FIELDS: 'Some required fields are missing',
  INVALID_FIELD: 'Invalid fields',
  SHORT_DISPLAY_NAME: '"displayName" length must be at least 8 characters long',
  INVALID_EMAIL: '"email" must be a valid email',
  SHORT_PASSWORD: '"password" length must be at least 6 characters long',
  EXISTING_USER: 'User already registered',
  MISSING_TOKEN: 'Token not found',
  INVALID_TOKEN: 'Expired or invalid token',
  USER_NOT_FOUND: 'User does not exist',
  MISSING_NAME: '"name" is required',
};

const statusCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
};

module.exports = {
  errorMessages,
  statusCode,
};