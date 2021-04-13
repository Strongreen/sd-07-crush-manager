const errorMiddleware = require('./error');
const authorizationMiddleware = require('./authorization');
const nameMiddleware = require('./name');
const ageMiddleware = require('./age');
const dateMiddleware = require('./date');

module.exports = {
  errorMiddleware,
  authorizationMiddleware,
  nameMiddleware,
  ageMiddleware,
  dateMiddleware,
};