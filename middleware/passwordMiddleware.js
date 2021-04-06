const util = require('../util');

const passwordMiddleware = (req, res, next) => {
    const { password } = req.body;

    if (password === undefined || password.length === 0) {
        return res.status(400).send({ message: 'O campo \'password\' é obrigatório' });
    }
    if (util.validationPassword(password)) {
        return res.status(400).send({
            message: 'O \'password\' deve ter pelo menos 6 caracteres',
        });
    }

    return next();
};

module.exports = passwordMiddleware;
