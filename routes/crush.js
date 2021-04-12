const express = require('express');
const utils = require('../utils/utils');

const app = express();
const SUCCESS = 200;
const NOTFOUND = 404;

app.get('/', async (_request, response) => {
  response.status(SUCCESS).send(await utils.getCrushs());
});

app.get('/:id', async (request, response) => {
  const { id } = request.params;  
  const crush = await utils.getCrushById(id);
  
  if (crush) return response.status(SUCCESS).send(crush); 

  return response.status(NOTFOUND).send({
    message: 'Crush não encontrado',
  });
});

module.exports = app;