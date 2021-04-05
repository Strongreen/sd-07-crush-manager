const express = require('express');

const routes = express.Router();

const controllers = require('./controllers');

routes.get('/crush', controllers.getCrushList);

routes.get('/crush/:id', controllers.getCrushById);

module.exports = routes;
