const validateAgeMiddleware = require('./validateAge');
const validateDateMiddleware = require('./validateDate');
const validateEmailMiddleware = require('./validateEmail');
const validateNameMiddleware = require('./validateName');
const validatePasswordMiddleware = require('./validatePassword');
const validateTokenMiddleware = require('./validateToken');
const valedateRateMiddleware = require('./validateRate');

module.exports = { 
  validateAgeMiddleware,
  validateDateMiddleware,
  validateEmailMiddleware,
  validateNameMiddleware,
  validatePasswordMiddleware,
  validateTokenMiddleware,
  valedateRateMiddleware,
};
