const errorMiddleware = require('./error');
const CustomError = require('./CustomError');
const validateAge = require('./validateAge');
const validateDate = require('./validateDate');
const validateName = require('./validateName');
const validateToken = require('./validateToken');

module.exports = {
    CustomError,
    errorMiddleware,
    validateAge,
    validateDate,
    validateName,
    validateToken,
};