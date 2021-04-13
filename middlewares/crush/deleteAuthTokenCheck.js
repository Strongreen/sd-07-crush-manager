const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.delete('/:id', (request, response, next) => {
  const authtoken = request.header('Authorization');
  if (authtoken == null) {
    return response.status(401).send({
      message: 'Token não encontrado',
    });
  }
  if (authtoken.length !== 16) {
    return response.status(401).send({
      message: 'Token inválido',
    });
  }
  next();
});

module.exports = app;