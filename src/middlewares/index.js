const loginMiddleware = require('./loginMiddleware');
const dataValidations = require('./dataValidationsMiddleware');
const tokenMiddleware = require('./tokenMiddleware');

module.exports = {
  loginMiddleware,
  dataValidations,
  tokenMiddleware,
};
