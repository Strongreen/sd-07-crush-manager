const express = require('express');
const crushes = require('../crush.json');

const app = express();

app.get('/', (request, response) => {
  if (crushes.length < 1) {
    response.status(200).send([]);
  }
  response.status(200).send(JSON.stringify(crushes));
});

app.get('/:id', (request, response) => {
  const { id } = request.params;
  let output = crushes.find((crush) => crush.id === id);

  if (output != null) {
    response.status(200).send(JSON.stringify(output));
  }
  output = {
    message: 'Crush não encontrado',
  };
  response.status(404).send(JSON.stringify(output));
});

module.exports = app;