const express = require('express');
const middleware = require('./index');

const route = express.Router();

const middAll = () => {
  route.use(middleware.validateTokenMiddleware);
  route.use(middleware.validateNameMiddleware);
  route.use(middleware.validateAgeMiddleware);
  route.use(middleware.validateDateMiddleware);
  route.use(middleware.valedateRateMiddleware);
  
  return route;
};

module.exports = middAll;