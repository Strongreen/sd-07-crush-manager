const authMiddleware = require('./authMiddleware');
const nameMiddleware = require('./nameMiddleware');
const ageMiddleware = require('./ageMiddleware');
const dateMiddleware = require('./dateMiddleware');
const validDateMiddleware = require('./validDateMiddleware');
const validRateMiddleware = require('./validRateMiddleware');
const emailMiddleware = require('./validRateMiddleware');
const passwordMiddleware = require('./validRateMiddleware');

module.exports = {
  nameMiddleware,
  ageMiddleware,
  dateMiddleware,
  validDateMiddleware,
  validRateMiddleware,
  authMiddleware,
  emailMiddleware,
  passwordMiddleware,
};
