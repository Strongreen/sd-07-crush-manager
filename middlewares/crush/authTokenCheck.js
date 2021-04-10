const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/', (request, response, next) => {
  const authtoken = request.header('Authorization');
  if (authtoken == null) {
    response.status(401).send({
      message: 'Token não encontrado',
    });
  }
  if (authtoken.length !== 16) {
    response.status(401).send({
      message: 'Token inválido',
    });
  }
  next();
});

module.exports = app;