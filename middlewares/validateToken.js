const utils = require('../utils/utils');

const UNAUTHORIZED = 401;

const validateTokenMiddleware = (request, response, next) => {
  const { authorization } = request.headers;
  
  try {
    utils.isValidateToken(authorization);

    next();
  } catch (error) {
    response.status(UNAUTHORIZED).send(error.message);
  }
};

module.exports = { validateTokenMiddleware };