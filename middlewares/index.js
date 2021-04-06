const validateEmail = require('./validateEmail');
const validatePassword = require('./validatePassword');
const auth = require('./auth');
const validateName = require('./validateName');
const validateAge = require('./validateAge');
const dateValidation = require('./dateValidation');
const dateRateMW = require('./dateRateMW');
const errorMiddleware = require('./errorMiddleware');

module.exports = {
  validateEmail,
  validatePassword,
  auth,
  validateName,
  validateAge,
  dateValidation,
  dateRateMW,
  errorMiddleware,
};
