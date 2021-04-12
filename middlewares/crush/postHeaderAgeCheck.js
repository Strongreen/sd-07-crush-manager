const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/', (request, response, next) => {
  const { age } = request.body;
  if (typeof age === 'undefined') {
    response.status(400).send({
      message: 'O campo "age" é obrigatório',
    });
  }
  if (age < 18) {
    response.status(400).send({
      message: 'O crush deve ser maior de idade',
    });
  }
  next();
});

module.exports = app;