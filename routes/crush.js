const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const bodyParser = require('body-parser');
const authToken = require('../middlewares/crush/authTokenCheck');
const postHeaderNameCheck = require('../middlewares/crush/postHeaderNameCheck');
const postHeaderAgeCheck = require('../middlewares/crush/postHeaderAgeCheck');
const postHeaderDateUndefinedCheck = require('../middlewares/crush/postHeaderDateUndefinedCheck');
const postHeaderDateValuesCheck = require('../middlewares/crush/postHeaderDateValuesCheck');

const putAuthToken = require('../middlewares/crush/putAuthTokenCheck');
const putHeaderNameCheck = require('../middlewares/crush/putHeaderNameCheck');
const putHeaderAgeCheck = require('../middlewares/crush/putHeaderAgeCheck');
const putHeaderDateUndefinedCheck = require('../middlewares/crush/putHeaderDateUndefinedCheck');
const putHeaderDateValuesCheck = require('../middlewares/crush/putHeaderDateValuesCheck');

const deleteAuthToken = require('../middlewares/crush/deleteAuthTokenCheck');

const jsonPath = path.join(__dirname, '..', 'crush.json');

const app = express();

app.use(bodyParser.json());
app.use(authToken);
app.use(postHeaderNameCheck);
app.use(postHeaderAgeCheck);
app.use(postHeaderDateUndefinedCheck);
app.use(postHeaderDateValuesCheck);

app.use(putAuthToken);
app.use(putHeaderNameCheck);
app.use(putHeaderAgeCheck);
app.use(putHeaderDateUndefinedCheck);
app.use(putHeaderDateValuesCheck);

app.use(deleteAuthToken);

app.get('/', async (request, response) => {
  const crushes = JSON.parse(await fs.readFile(jsonPath, 'utf8'));
  if (crushes.length >= 1) {
    return response.status(200).send(crushes);
  }
  return response.status(200).send([]);
});

app.get('/:id', async (request, response) => {
  const { id: idpedido } = request.params;
  const crushes = JSON.parse(await fs.readFile(jsonPath, 'utf8'));
  crushes.forEach((crushe) => {
    if (parseInt(crushe.id, 10) === parseInt(idpedido, 10)) {
      return response.status(200).send(crushe);
    }
  });
  return response.status(404).send({
    message: 'Crush não encontrado',
  });
});

app.post('/', async (request, response) => {
  const { name, date, age } = request.body;
  let outputCrushes = [];
  try {
    outputCrushes = JSON.parse(await fs.readFile(jsonPath, 'utf8'));
  } catch (error) { console.log(error); }
  let index = 1;
  if (outputCrushes.length > 0) { index = outputCrushes.length; }
  const newCrush = {
    name,
    age,
    id: index + 1,
    date: {
      datedAt: date.datedAt,
      rate: date.rate },
  };
  outputCrushes.push(newCrush);
  await fs.writeFile(jsonPath, JSON.stringify(outputCrushes), 'utf8');
  return response.status(201).send(outputCrushes[outputCrushes.length - 1]);
});

app.put('/:id', async (request, response) => {
  const { id: idpedido } = request.params;
  const { name, date, age } = request.body;
  const crush = JSON.parse(await fs.readFile(jsonPath, 'utf8'));
  crush[idpedido - 1].name = name;
  crush[idpedido - 1].date = date;
  crush[idpedido - 1].age = age;
  await fs.writeFile(jsonPath, JSON.stringify(crush), 'utf8');
  return response.status(200).send(crush[idpedido - 1]);
});

app.delete('/:id', async (request, response) => {
  console.log('');
  const { id: idpedido } = request.params;
  const crush = JSON.parse(await fs.readFile(jsonPath, 'utf8'));
  crush.filter((element) => element.id !== parseInt(idpedido, 10));
  await fs.writeFile(jsonPath, JSON.stringify(crush), 'utf8');
  return response.status(200).send({ message: 'Crush deletado com sucesso' });
});

module.exports = app;