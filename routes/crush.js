const express = require('express');
// const rescue = require('express-rescue');

const getAllCrushs = require('../controller/getAllCrushs');
const getCrushById = require('../controller/getCrushById');

const routes = express.Router();

// Requisito 1
routes.get('/', getAllCrushs);

// Requisito 2
routes.get('/:id', getCrushById);

module.exports = routes;
