const crypto = require('crypto');

const tokenMidware = (req, res, _next) => {
    try {
        res.send({
            token: crypto.randomBytes(8).toString('hex'),
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = tokenMidware;