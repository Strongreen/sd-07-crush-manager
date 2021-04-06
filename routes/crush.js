const express = require('express');
// const bodyParser = require('body-parser');
const crushData = require('../crush.json');

const app = express();

// app.use(bodyParser.json());
const SUCCESS = 200;

app.get('/', (_request, response) => {
  response.status(SUCCESS).send(crushData);
});

app.get('/:id', (request, response) => {
  const { id } = request.params;
  const crush = crushData
    .find(({ id: crushId }) => crushId === parseInt(id, 10));
  response.status(SUCCESS).send(crush);
});

module.exports = app;