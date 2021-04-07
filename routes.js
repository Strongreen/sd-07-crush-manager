const express = require('express');

const route = express.Router();

const crushController = require('./controllers/crushController');

route.get('/crush', crushController.getAllCrushs);

route.get('/crush/:id', crushController.getCrushById);

module.exports = route;
