const authMiddleware = require('./authMiddleware');
const emailMiddleware = require('./emailMiddleware');
const passwordMiddleware = require('./passwordMiddleware');

module.exports = {
  authMiddleware,
  emailMiddleware,
  passwordMiddleware,
};