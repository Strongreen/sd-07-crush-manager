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

const searchTokenCheck = require('../middlewares/crush/getAuthTokenSearch');

const jsonPath = path.join(__dirname, '..', 'crush.json');

const route = express.Router();

route.use(bodyParser.json());
route.use(authToken);
route.use(postHeaderNameCheck);
route.use(postHeaderAgeCheck);
route.use(postHeaderDateUndefinedCheck);
route.use(postHeaderDateValuesCheck);

route.use(putAuthToken);
route.use(putHeaderNameCheck);
route.use(putHeaderAgeCheck);
route.use(putHeaderDateUndefinedCheck);
route.use(putHeaderDateValuesCheck);

route.use(deleteAuthToken);

route.use(searchTokenCheck);

route.get('/', async (request, response) => {
  const crushes = JSON.parse(await fs.readFile(jsonPath, 'utf8'));
  if (crushes.length >= 1) {
    return response.status(200).send(crushes);
  }
  return response.status(200).send([]);
});

route.get('/search', async (request, response) => {
  const { q } = request.query;
  const crushes = JSON.parse(await fs.readFile(jsonPath, 'utf8'));
  if (typeof q === 'undefined' || q === null || q === '') {
    return response.status(200).send(crushes);
  }
  const output = crushes.filter((element) => 
    element.name.toLowerCase().includes(q.toLowerCase())
    || element.name.toLowerCase() === q.toLowerCase());
  return response.status(200).send(output);
});

route.get('/:id', async (request, response) => {
  const { id: idpedido } = request.params;
  const crushes = JSON.parse(await fs.readFile(jsonPath, 'utf8'));
  const output = crushes.filter((crushe) => parseInt(crushe.id, 10) === parseInt(idpedido, 10));
  if (output.length > 0) {
    return response.status(200).send(output[0]);
  }
  return response.status(404).send({
    message: 'Crush não encontrado',
  });
});

route.post('/', async (request, response) => {
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

route.put('/:id', async (request, response) => {
  const { id: idpedido } = request.params;
  const { name, date, age } = request.body;
  const crush = JSON.parse(await fs.readFile(jsonPath, 'utf8'));
  crush[idpedido - 1].name = name;
  crush[idpedido - 1].date = date;
  crush[idpedido - 1].age = age;
  await fs.writeFile(jsonPath, JSON.stringify(crush), 'utf8');
  return response.status(200).send(crush[idpedido - 1]);
});

route.delete('/:id', async (request, response) => {
  const { id: idpedido } = request.params;
  const crush = JSON.parse(await fs.readFile(jsonPath, 'utf8'));
  crush.filter((element) => element.id !== parseInt(idpedido, 10));
  await fs.writeFile(jsonPath, JSON.stringify(crush), 'utf8');
  return response.status(200).send({ message: 'Crush deletado com sucesso' });
});

module.exports = route;