const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const { OK, NOT_FOUND } = require('./httpCode');
const { notFound } = require('./errorMessages');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

app.get('/', (_req, res) => {
  res.status(OK).send();
});

app.get('/crush', async (_req, res) => {
  const data = await fs.promises.readFile(`${__dirname}/crush.json`, 'utf-8')
    .then((result) => res.status(OK).send(JSON.parse(result)))
    .catch((err) => console.error(err));
  return data;
});

const nada = 'nada';
console.log(nada);

app.get('/crush/:id', async (req, res) => {
  const { id } = req.params;
  const data = await fs.promises.readFile(`${__dirname}/crush.json`, 'utf-8');
  const result = data.find((crush) => crush.id === id);

  if (result === undefined) {
    res.status(NOT_FOUND).json(notFound);
  } else {
    res.status(OK).json(JSON.parse(result));
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
