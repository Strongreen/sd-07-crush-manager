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

routes.route('/crush/:id')
  .get(controllers.getCrushById)
  .put(
    validateToken,
    validateName,
    validateAge,
    validateDate,
    controllers.updateCrush,
  );

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
