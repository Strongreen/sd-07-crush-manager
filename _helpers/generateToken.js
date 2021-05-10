const crypto = require('crypto');

const generateToken = () => {
  const tokenGenerated = crypto.randomBytes(8).toString('hex');
  return ({ token: tokenGenerated });
};

module.exports = generateToken;
