const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/', (request, response, next) => {
  const { date } = request.body;
  if (typeof date === 'object') {
    response.status(400).send({
      message: 'O campo "name" é obrigatório',
    });
  }

  next();
});

module.exports = app;