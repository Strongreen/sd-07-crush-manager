const fs = require('fs');
const express = require('express');
const middleware = require('../middleware');
const validateToken = require('../middleware/validateToken');

const app = express();
const crushListJSON = './crush.json';
const useCrushMiddleware = middleware();
const constanteExtremamenteLongaEDesnecessaria = '/crush/:id';

app.get('/crush', (_request, response) => {
  const data = JSON.parse(fs.readFileSync(crushListJSON));

  if (data.length > 0) return response.status(200).send(data);
  
  response.status(200).send([]);
});

app.get('/crush/search', validateToken, (request, response) => {
  const { q } = request.query;
  const data = JSON.parse(fs.readFileSync(crushListJSON));

  if (typeof q === 'undefined' || q === '') {
    return response.status(200).send(data);
  }

  const searchResult = [];
  data.forEach((crush) => {
    if (crush.name.toLowerCase().includes(q.toLowerCase())) searchResult.push(crush);
  });

  response.status(200).send(searchResult);
});

app.get(constanteExtremamenteLongaEDesnecessaria, (request, response) => {
  const { id } = request.params;
  const data = JSON.parse(fs.readFileSync(crushListJSON));

  const dataFind = data.find((crush) => crush.id === Number(id));
  if (dataFind) return response.status(200).send(dataFind);

  response.status(404).send({
    message: 'Crush não encontrado',
  });
});

app.post('/crush', useCrushMiddleware, (request, response) => {
  const { name, age, date } = request.body;
  const data = JSON.parse(fs.readFileSync(crushListJSON));

  const entry = { id: data.length + 1, name, age, date };
  const newCrushList = [...data, entry];

  fs.writeFileSync(crushListJSON, JSON.stringify(newCrushList));

  return response.status(201).send(entry);
});

app.put(constanteExtremamenteLongaEDesnecessaria, useCrushMiddleware, (request, response) => {
  const { id } = request.params;
  const { name, age, date } = request.body;
  const data = JSON.parse(fs.readFileSync(crushListJSON));

  const edit = { id: Number(id), name, age, date };

  const index = data.findIndex((crush) => crush.id === Number(id));
  data.splice(index, 1, edit);

  fs.writeFileSync(crushListJSON, JSON.stringify(data));

  return response.status(200).send(data[index]);
});

app.delete(constanteExtremamenteLongaEDesnecessaria, validateToken, (request, response) => {
  const { id } = request.params;
  const data = JSON.parse(fs.readFileSync(crushListJSON));

  const index = data.findIndex((crush) => crush.id === Number(id));
  data.splice(index, 1);

  fs.writeFileSync(crushListJSON, JSON.stringify(data));

  response.status(200).send({ message: 'Crush deletado com sucesso' });
});

module.exports = app;
