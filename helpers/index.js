const express = require('express');
const middlewares = require('../middlewares');

const route = express.Router();

const helpersMiddlewares = () => {
  route.use(middlewares.tokennNot);
  route.use(middlewares.tokenInvalido);
   route.use(middlewares.tokenName);
   route.use(middlewares.tokenAge);
   route.use(middlewares.tokenDate);
   route.use(middlewares.tokenDateObr);
   return route;
};

module.exports = helpersMiddlewares;