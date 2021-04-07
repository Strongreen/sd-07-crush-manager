const express = require('express');
const bodyParser = require('body-parser');
const desafio1 = require('./desafio1');
const desafio2 = require('./desafio2');
const desafio3 = require('./desafio3');
const desafio4 = require('./desafio4');
const desafio5 = require('./desafio5');
const desafio6 = require('./desafio6');
const middlewares = require('./middlewares/validateToken');

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
app.use(desafio3);
app.use(middlewares.validateToken, desafio4);
app.use(middlewares.validateToken, desafio5);
app.use(middlewares.validateToken, desafio6);

app.listen(PORT, () => {
  console.log('Online');
});
