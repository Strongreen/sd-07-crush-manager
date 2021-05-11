const crypto = require('crypto');

module.exports = () => {
  const tokenGenerated = crypto.randomBytes(8).toString('hex');
  return ({ token: tokenGenerated });
};
