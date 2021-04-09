const express = require('express');

const route = express.Router();

const crushController = require('./controllers/crushController');

const middlewares = require('./middlewares');

const { validateEmail } = middlewares;

route.get('/crush', validateEmail, crushController.getAllCrushs);

route.get('/crush/:id', crushController.getCrushById);

module.exports = route;
