const express = require('express');

const login = require('../controller/login');

const routes = express.Router();

// Requisito 3
routes.post('/', (login));

module.exports = routes;