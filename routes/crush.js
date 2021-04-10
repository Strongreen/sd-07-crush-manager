const express = require('express');
const crushes = require('../crush.json');

const app = express();

app.get('/', (request, response) => {
  if (crushes.length <= 0) {
    response.status(200).send([]);
  }
  response.status(200).send(crushes);
});

app.get('/:id', (request, response) => {
  const { id: idpedido } = request.params;
  let output = crushes.find((crush) => parseInt(crush.id, 10) === idpedido);
  if (output != null) {
    response.status(200).send(output);
  }
  output = {
    message: 'Crush não encontrado',
  };
  response.status(404).send(output);
});

module.exports = app;