const express = require('express');

const routes = express.Router();

const controllers = require('./controllers');
const {
  validadeEmail,
  validatePassword,
  validateToken,
  validateName,
  validateAge,
  validateDate,
} = require('./middlewares');

routes.get('/crush', controllers.getCrushList);

routes.get('/crush/:id', controllers.getCrushById);

routes.post('/crush',
  validateToken,
  validateName,
  validateAge,
  validateDate,
  controllers.createCrush);

routes.post('/login',
  validadeEmail,
  validatePassword,
  controllers.login);

module.exports = routes;
