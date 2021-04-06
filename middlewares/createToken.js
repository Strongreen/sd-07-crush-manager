const crypto = require('crypto');

const createToken = (req, _res, next) => {
  req.headers.Authorization = crypto.randomBytes(8).toString('hex');
  next();
};

module.exports = createToken;
