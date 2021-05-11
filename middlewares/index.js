const ageValidationMiddleware = require('./ageValidationMiddleware.js');
const authorizationMiddleware = require('./authorizationMiddleware.js');
const dateValidationMiddleware = require('./dateValidationMiddleware.js');
const errorMiddleware = require('./errorMiddleware.js');
const nameValidationMiddleware = require('./nameValidationMiddleware.js');

module.exports = {
  ageValidationMiddleware,
  authorizationMiddleware,
  dateValidationMiddleware,
  errorMiddleware,
  nameValidationMiddleware,
};
