const express = require('express');
const validateAge = require('./validateAge');
const validateDate = require('./validateDate');
const validateName = require('./validateName');
const validateToken = require('./validateToken');

const router = express.Router();

const useMiddlewares = () => {
  router.use(validateToken);
  router.use(validateName);
  router.use(validateAge);
  router.use(validateDate);
  return router;
};

module.exports = useMiddlewares;
