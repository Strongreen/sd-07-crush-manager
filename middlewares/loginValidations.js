/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable max-lines-per-function */
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/', (request, response, next) => {
  const { email, password } = request.body;
  // Verify if email is empty
  if (email === '') {
    response.status(400).send({
      message: 'O campo \'email\' é obrigatório',
    });
  }
  // Verify if password is empty
  if (password === '') {
    response.status(400).send({
      message: 'O campo "password" é obrigatório',
    });
  }
  // Validation Email and password
  const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (validateEmail.test(email)) {
    if (password.toString().length > 5) {
      // Confirmation and middleware exit
      next();
    } else {
      response.status(400).send({
        message: 'A "senha" deve ter pelo menos 6 caracteres',
      });
    }
  } else {
    response.status(400).send({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
} 
});

module.exports = app;