const express = require('express');
const crushes = require('../crush.json');

const app = express();

app.get('/', (request, response) => {
  if (crushes.length > 0) {
    response.status(200).send(crushes);
  }
  response.status(200).send([]);
});

app.get('/:id', (request, response) => {
  const { id: idpedido } = request.params;
  crushes.forEach((crush) => {
    if (parseInt(crush.id, 10) === parseInt(idpedido, 10)) {
      response.status(200).send(crush);
    }
  });
  
  response.status(404).send({
    message: 'Crush não encontrado',
  });
});

module.exports = app;