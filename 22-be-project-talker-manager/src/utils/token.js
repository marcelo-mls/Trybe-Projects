const crypto = require('crypto');

// https://stackoverflow.com/questions/70566188/node-js-crypto-randombytes-is-not-a-function
function setToken(length) {
  const token = crypto.randomBytes(length / 2).toString('hex');
  return token;
}

module.exports = setToken;