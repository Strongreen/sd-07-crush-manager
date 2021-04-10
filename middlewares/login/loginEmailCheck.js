/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable max-lines-per-function */
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/', (request, response, next) => {
  const { email } = request.body;
 
  // Validation Email and password
  const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (validateEmail.test(email)) {
    next();
  } else {
    response.status(400).send({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
} 
});

module.exports = app;