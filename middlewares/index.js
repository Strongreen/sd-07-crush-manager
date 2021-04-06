const authMiddleware = require('./auth');
const nameMiddleware = require('./name');
const ageMiddleware = require('./age');
const dateMiddleware = require('./date');
const errorMiddleware = require('./error');

module.exports = {
  authMiddleware,
  nameMiddleware,
  ageMiddleware,
  dateMiddleware,
  errorMiddleware,
};
