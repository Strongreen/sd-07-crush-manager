const crypto = require('crypto');

module.exports = (length) => crypto.randomBytes(length).toString('hex');
