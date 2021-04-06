const postLoginValidation = require('./postLoginValidation');
const postAttributeValidation = require('./postAttributeValidation');
const putAttributeValidation = require('./putAttributeValidation');
const pageNotFoundValidation = require('./pageNotFoundValidation');

module.exports = {
    postLoginValidation,
    postAttributeValidation,
    putAttributeValidation,
    pageNotFoundValidation,
};
