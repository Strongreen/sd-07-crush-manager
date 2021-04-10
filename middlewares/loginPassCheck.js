/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable max-lines-per-function */
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/', (request, response, next) => {
  const { password } = request.body;
    if (password.toString().length > 5) {
      // Confirmation and middleware exit
      next();
    } else {
      response.status(400).send({
        message: 'A "senha" deve ter pelo menos 6 caracteres',
      });
    }
});

module.exports = app;