const logMiddware = require('./log');
const errorMiddware = require('./error');
const tokenMiddleware = require('./token');
const validateEmailMiddleware = require('./validateEmail');
const validatePasswordMiddleware = require('./validatePassword');

module.exports = {
    logMiddware,
    errorMiddware,
    tokenMiddleware,
    validateEmailMiddleware,
    validatePasswordMiddleware,
};
