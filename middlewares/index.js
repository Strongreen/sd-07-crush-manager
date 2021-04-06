const authMiddleware = require('./auth');
const nameMiddleware = require('./name');
const ageMiddleware = require('./age');
const dateMiddleware = require('./date');

module.exports = {
  authMiddleware,
  nameMiddleware,
  ageMiddleware,
  dateMiddleware,
};
