const logMiddware = require('./log');
const errorMiddware = require('./error');
const tokenMiddleware = require('./token');
const validateEmailMiddleware = require('./validateEmail');
const validatePasswordMiddleware = require('./validatePassword');
const validateNameMiddleware = require('./validateName');
const validateAgeMiddleware = require('./validateAge');
const validateDateMiddleware = require('./validateDate');
const validateRegexDateMiddleware = require('./validateRegexDate');

module.exports = {
    logMiddware,
    errorMiddware,
    tokenMiddleware,
    validateEmailMiddleware,
    validatePasswordMiddleware,
    validateNameMiddleware,
    validateAgeMiddleware,
    validateDateMiddleware,
    validateRegexDateMiddleware,
};
