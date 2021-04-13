const utils = require('../utils/utils');

const BAD_REQUEST = 400;

const checkObjectCrushMiddleware = (request, response, next) => {
  const { name, age, date } = request.body; 
  
  try {
    utils.isValidateName(name);
    utils.isValidateAge(age);
    utils.isValidateDate(date);
    utils.isValidateRate(date);
    next();
  } catch (error) {
    response.status(BAD_REQUEST).json(error.message);
  }
};

module.exports = checkObjectCrushMiddleware;