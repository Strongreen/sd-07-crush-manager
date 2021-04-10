const express = require('express');

const route = express.Router();

const { 
    getAllCrushsController,
    getCrushByIdController,
    deleteCrushByIdController,
} = require('./controllers/crushController');

const { getTokenController } = require('./controllers/loginController');

const middlewares = require('./middlewares');

const {
    validateEmailMiddleware,
    validatePasswordMiddleware,
    validateTokenMiddleware } = middlewares;

route.get('/crush', getAllCrushsController);

route.get('/crush/:id', getCrushByIdController);

route.delete('/crush/:id', validateTokenMiddleware, deleteCrushByIdController);

route.post('/login', validateEmailMiddleware, validatePasswordMiddleware, getTokenController);

module.exports = route;
