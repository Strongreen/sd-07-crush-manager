const authMiddleware = require('./authMiddleware');
const emailMiddleware = require('./emailMiddleware');
const passwordMiddleware = require('./passwordMiddleware');
const ageMiddleware = require('./ageMiddleware');
const dateMiddleware = require('./dateMiddleware');
const nameMiddleware = require('./nameMiddleware');
const rateMiddleware = require('./rateMiddleware');

module.exports = {
  authMiddleware,
  emailMiddleware,
  passwordMiddleware,
  ageMiddleware,
  dateMiddleware,
  nameMiddleware,
  rateMiddleware,
};