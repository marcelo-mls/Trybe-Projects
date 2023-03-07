const md5 = require('md5');

function validatePassword(passA, passB) {
  return md5(passA) === passB;
}

function createHash(password) {
  return md5(password);
}

module.exports = {
  validatePassword,
  createHash,
};
