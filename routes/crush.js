const express = require('express');
const crushes = require('../crush.json');

const app = express();

app.get('/', (request, response) => {
  if (crushes.length < 1) {
    response.status(200).send([]);
  }
  response.status(200).send(crushes);
});

app.get('/:id', (request, response) => {
  const { id } = request.params;
  const output = crushes.find((crush) => crush.id === id);

  if (output != null) {
    response.status(200).send(output);
  }

  response.status(404).send({
    message: 'Crush não encontrado',
  });
});

module.exports = app;