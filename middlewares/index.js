const authorizationMiddleware = require('./authorizationMid');
const emailMiddleware = require('./emailMid');
const passwordMiddleware = require('./passwordMid');
const nameMiddleware = require('./nameMid');
const ageMiddleware = require('./ageMid');
const emptyDateRateMiddleware = require('./emptyDateRateMid');
const formatedDateRateMiddleware = require('./formatedDateRateMid');
const requestTokenMidware = require('./requestTokenMid');
const addCrushMiddleware = require('./addCrushMid');
const errorMiddleware = require('./errorMid');

module.exports = {
  authorizationMiddleware,
  emailMiddleware,
  passwordMiddleware,
  nameMiddleware,
  ageMiddleware,
  emptyDateRateMiddleware,
  formatedDateRateMiddleware,
  requestTokenMidware,
  addCrushMiddleware,
  errorMiddleware
};
