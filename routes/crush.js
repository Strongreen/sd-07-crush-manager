const express = require('express');
// const bodyParser = require('body-parser');
const crushData = require('../crush.json');

const app = express();

// app.use(bodyParser.json());
const SUCCESS = 200;
const ERROR = 404;

app.get('/', async (_request, response) => {
  await response.status(SUCCESS).send(crushData);
});

app.get('/:id', async (request, response) => {
  const { id } = request.params;
  const crush = await crushData.find(({ id: crushId }) => +id === +crushId);

  if (!crush) {
    const message = { message: 'Crush não encontrado' };
    response.status(ERROR).send(message);
  }

    response.status(SUCCESS).send(crush);
});

module.exports = app;