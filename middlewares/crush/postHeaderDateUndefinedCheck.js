const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/', (request, response, next) => {
  const { date } = request.body;
  const keys = Object.keys(date);
  if (typeof date === 'undefined'
  || !(keys.includes('datedAt') && keys.includes('rate'))) {
    response.status(400).send({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  next();
});

module.exports = app;