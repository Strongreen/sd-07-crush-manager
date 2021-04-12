const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/', (request, response, next) => {
  const { date } = request.body;
  const validate = /^[0-3]?[0-9]\/[01]?[0-9]\/[12][90][0-9][0-9]$/;
  if (!validate.test(date.datedAt)) {
    response.status(400).send({
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  if (parseInt(date.rate, 10) < 0 || parseInt(date.rate, 10) > 6) {
    response.status(400).send({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  next();
});

module.exports = app;