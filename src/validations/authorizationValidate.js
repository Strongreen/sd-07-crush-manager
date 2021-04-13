const crypto = require('crypto');

function authorizationValidate(req) {
  const { Authorization: token } = req.headers;
  if (!token) return crypto.randomBytes(8).toString('hex');
}

module.exports = authorizationValidate;