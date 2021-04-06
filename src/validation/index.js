const emailValidation = require('./emailValidation');
const postAttributeValidation = require('./postAttributeValidation');
const putAttributeValidation = require('./putAttributeValidation');
const pageNotFoundValidation = require('./pageNotFoundValidation');

module.exports = {
    emailValidation,
    postAttributeValidation,
    putAttributeValidation,
    pageNotFoundValidation,
};
