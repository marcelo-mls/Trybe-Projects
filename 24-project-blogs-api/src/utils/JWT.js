require('dotenv/config');
const JWT = require('jsonwebtoken');

function createToken(data) {
  const token = JWT.sign({ data }, process.env.JWT_SECRET, 
    {
      expiresIn: '1d',
      algorithm: 'HS256',
    });

    return token;
}

module.exports = {
  createToken,
};