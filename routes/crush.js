const express = require('express');
const fs = require('fs');

const app = express.Router();
const PATH = './crush.json';
const CRUSHIDPATH = '/:id';

// --------------------- Middleware ---------------------
const validateAgeMiddleware = require('../middlewares/validateAge');
const validateTokenMiddleware = require('../middlewares/validateToken');
const validateNameMiddleware = require('../middlewares/validateName');
const validateDateMiddleware = require('../middlewares/validateDate');
const validateDateFormateMiddleware = require('../middlewares/validateDateFormate');
const validateRateRangeMiddleware = require('../middlewares/validateRateRange');

// --------------------- REQ 1 ---------------------
app.get('/', (_request, response) => {
  const data = JSON.parse(fs.readFileSync(PATH));
  if (!data) return response.status(200).json([]);
  response.status(200).json(data);
});

// --------------------- REQ 7 ---------------------
app.get('/search', validateTokenMiddleware, (request, response) => {
  const data = JSON.parse(fs.readFileSync(PATH));
  const { q } = request.query;
  const result = data.filter((item) => item.name.toUpperCase().includes(q.toUpperCase()));
  if (result) return response.status(200).json(result);
  if (!result) return response.status(200).send([]);
  if (!q) return response.status(200).json(data);
});

// --------------------- REQ 2 ---------------------
app.get(CRUSHIDPATH, (request, response) => {
  const data = JSON.parse(fs.readFileSync(PATH));
  const { id } = request.params;
  const result = data.find((item) => item.id === Number(id));
  if (result) return response.status(200).send(result);
  if (request.params !== 'search') {
    return response.status(404).json({ message: 'Crush não encontrado' });
  }
});

// --------------------- REQ 6 ---------------------
app.use(validateTokenMiddleware);
app.delete(CRUSHIDPATH, (request, response) => {
  const { id } = request.params;
  const data = JSON.parse(fs.readFileSync(PATH));
  const newData = data.filter((item) => item.id !== Number(id));
  fs.writeFileSync(PATH, JSON.stringify(newData, null, 2));
  response.status(200).json({ message: 'Crush deletado com sucesso' });
});

// --------------------- REQ 4 ---------------------
app.use(validateNameMiddleware);
app.use(validateDateMiddleware);
app.use(validateAgeMiddleware);
app.use(validateDateFormateMiddleware);
app.use(validateRateRangeMiddleware);
app.post('/', (request, response) => {
  const { name, age, date, id } = request.body;
  const dataFile = JSON.parse(fs.readFileSync(PATH));
  dataFile.push({ id: id || dataFile.length + 1, name, age, date });
  fs.writeFileSync(PATH, JSON.stringify(dataFile, null, 2));
  const data = JSON.parse(fs.readFileSync(PATH));
  response.status(201).send(data[data.length - 1]);
});

// --------------------- REQ 5 ---------------------
app.put(CRUSHIDPATH, (request, response) => {
  const { id } = request.params;
  const { name, age, date } = request.body;
  const data = JSON.parse(fs.readFileSync(PATH));
  const newData = data.filter((item) => item.id !== Number(id));
  newData.push({ id: Number(id), name, age, date });
  fs.writeFileSync(PATH, JSON.stringify(newData, null, 2));
  response.status(200).send(newData[Number(id) - 1]);
});

module.exports = app;