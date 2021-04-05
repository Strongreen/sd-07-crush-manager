const crypto = require('crypto');

const tokenMidware = (req, res, _next) => {
     res.send({
         token: crypto.randomBytes(8).toString('hex'),
     });
};

module.exports = tokenMidware;