/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable max-lines-per-function */
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/', (request, response, next) => {
  const { email } = request.body;
  if (typeof email === 'undefined' || email.toString() === '') {
    return response.status(400).send({
      message: 'O campo "email" é obrigatório',
    });
  }
  const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (validateEmail.test(email)) {
    next();
  } else {
    return response.status(400).send({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  } 
});

module.exports = app;