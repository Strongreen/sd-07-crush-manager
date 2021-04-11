const express = require('express');

const route = express.Router();

const { 
    getAllCrushsController,
    getCrushByIdController,
    createCrushController,
    updateCrushController,
    deleteCrushByIdController,
} = require('./controllers/crushController');

const { getTokenController } = require('./controllers/loginController');

const middlewares = require('./middlewares');

const CRUSH_ID = '/crush/:id';
const CRUSH = '/crush';
const LOGIN = '/login';

const {
    validateEmailMiddleware,
    validatePasswordMiddleware,
    validateAuthorizationMiddleware,
    validateAgeMiddleware,
    validateDateMiddleware,
    validateNameMiddleware,
    validateRateMiddleware } = middlewares;

route.get(CRUSH, getAllCrushsController);

route.get(CRUSH_ID, getCrushByIdController);

route.post(CRUSH,
  validateAuthorizationMiddleware,
  validateNameMiddleware,
  validateAgeMiddleware,
  validateDateMiddleware,
  validateRateMiddleware,
  createCrushController);

route.put(CRUSH_ID,
  validateAuthorizationMiddleware,
  validateNameMiddleware,
  validateAgeMiddleware,
  validateDateMiddleware,
  validateRateMiddleware,
  updateCrushController);

route.delete(CRUSH_ID, validateAuthorizationMiddleware, deleteCrushByIdController);

route.post(LOGIN, validateEmailMiddleware, validatePasswordMiddleware, getTokenController);

module.exports = route;
