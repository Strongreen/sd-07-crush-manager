const express = require('express');
const bodyParser = require('body-parser');
// const fs = require('fs').promises;
const desafio1 = require('./desafio1');
const desafio2 = require('./desafio2');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(desafio1);
app.use(desafio2);

app.listen(PORT, () => {
  console.log('Online');
});
