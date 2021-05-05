const emailValidation = require('./email');
const passwordValidation = require('./password');
const {
  handleField,
  checkDate,
  checkRate,
  checkDatedAt,
  checkAge,
  checkName,
} = require('./createCrush');

module.exports = {
  emailValidation,
  passwordValidation,
  handleField,
  checkDate,
  checkRate,
  checkDatedAt,
  checkAge,
  checkName,
};