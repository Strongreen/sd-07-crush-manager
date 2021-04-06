const express = require('express');
// const rescue = require('express-rescue');

const {
  getAllCrushs,
  getCrushById,
  createCrush,
  deleteCrush,
  searchCrush,
  editCrush,
} = require('../controller');
const {
  validateToken,
  validateName,
  validateAge,
  validateDateAt,
  validateRate,
} = require('../middlewares');

const routes = express.Router();

// Requisito 1
routes.get('/', getAllCrushs);

// Requisito 7
routes.get('/search', validateToken, searchCrush);

// Requisito 2
routes.get('/:id', getCrushById);

routes.use(validateToken);

// Requisito 6
routes.delete('/:id', deleteCrush);

// Requisito 4
routes.use(validateName);
routes.use(validateAge);
routes.use(validateDateAt);
routes.use(validateRate);

routes.post('/', createCrush);

// Requisito 5
routes.put('/:id', editCrush);

module.exports = routes;
