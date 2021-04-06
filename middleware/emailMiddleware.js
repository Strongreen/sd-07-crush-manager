const util = require('../util');

const emailMiddleware = (req, res, next) => {
    const { email } = req.body;

    if (email === undefined || email.length === 0) {
        return res.status(400).send({ message: 'O campo \'email\' é obrigatório' });
    }
    if (util.validationEmail(email)) {
        return res.status(400).send({
            message: 'O \'email\' deve ter o formato \'email@email.com\'',
        });
    }

    return next();
};

module.exports = emailMiddleware;
