const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { dataValidations, tokenMiddleware } = require('../middlewares');

const route = express.Router();

const dataDirectory = path.join(__dirname, '../../crush.json');

route.post('/crush', tokenMiddleware, dataValidations, async (req, res) => {
  try {
    console.log('Sem erros!');
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = route;