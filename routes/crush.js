const express = require('express');
// const rescue = require('express-rescue');

const getAllCrushs = require('../controller/getAllCrushs');
const getCrushById = require('../controller/getCrushById');
const createCrush = require('../controller/createCrush');
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

// Requisito 2
routes.get('/:id', getCrushById);

// requisito 4
// routes.use(express.json());

routes.use(validateToken);
routes.use(validateName);
routes.use(validateAge);
routes.use(validateDateAt);
routes.use(validateRate);

routes.post('/', createCrush);

module.exports = routes;
