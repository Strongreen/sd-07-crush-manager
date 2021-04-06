const validateEmail = require('./validateEmail');
const validatePassword = require('./validatePassword');
const auth = require('./auth');
const validateName = require('./validateName');
const validateAge = require('./validateAge');
const dateValidation = require('./dateValidation');
const dateRateMW = require('./dateRateMW');

module.exports = {
  validateEmail,
  validatePassword,
  auth,
  validateName,
  validateAge,
  dateValidation,
  dateRateMW,
};
