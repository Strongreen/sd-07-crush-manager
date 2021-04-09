const express = require('express');

const route = express.Router();

const { getAllCrushsController, getCrushByIdController } = require('./controllers/crushController');

const { getTokenController } = require('./controllers/loginController');

const middlewares = require('./middlewares');

const { validateEmailMiddleware, validatePasswordMiddleware } = middlewares;

route.get('/crush', getAllCrushsController);

route.get('/crush/:id', getCrushByIdController);

route.post('/login', validateEmailMiddleware, validatePasswordMiddleware, getTokenController);

module.exports = route;
