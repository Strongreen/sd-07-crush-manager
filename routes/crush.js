const express = require('express');
const fs = require('fs').promises;
const MIDDLEWARES = require('../middlewares/index.js');
const data = require('../crush.json');

const app = express();

app.get('/', async (_req, res) => {
  const response = await fs.readFile(`${__dirname}/../crush.json`, 'utf8');
  res.status(200).send(JSON.parse(response));
});

app.get('/search', MIDDLEWARES.authorizationMiddleware, async (req, res) => {
  const searchTerm = req.query.q;
  if (searchTerm === undefined || searchTerm === '') {
    res.status(200).send(data);
  }
  const response = await fs.readFile(`${__dirname}/../crush.json`, 'utf8');
  const filteredCrushes = JSON.parse(response).filter(({ name }) => name.includes(searchTerm));

  res.status(200).send(filteredCrushes);
});

app.get('/:id', (req, res) => {
  const { id } = req.params;
  const crushId = data.find((elem) => elem.id === parseInt(id, 10));

  if (!crushId) {
    res.status(404).send({
      message: 'Crush não encontrado',
    });
  }

  res.status(200).send(crushId);
});

app.use(MIDDLEWARES.authorizationMiddleware);

app.delete('/:id', (req, res) => {
  const { id } = req.params;
  const filteredCrushes = data.filter(
    (elem) => elem.id !== parseInt(id, 10),
  );

  fs.writeFile(
    `${__dirname}/../crush.json`,
    JSON.stringify(filteredCrushes),
  ).then(() => res.status(200).send({ message: 'Crush deletado com sucesso' }));
});

app.use(MIDDLEWARES.nameValidationMiddleware);
app.use(MIDDLEWARES.ageValidationMiddleware);
app.use(MIDDLEWARES.dateValidationMiddleware);

app.post('/', (req, res) => {
  const object = { id: data.length + 1, ...req.body };
  const newCrush = [...data, object];

  fs.writeFile(`${__dirname}/../crush.json`, JSON.stringify(newCrush)).then(() =>
    res.status(201).send(object));
});

app.put('/:id', (req, res) => {
  const { id } = req.params;
  const crush = { id: parseInt(id, 10), ...req.body };
  const filteredCrushes = data.filter(
    (elem) => elem.id !== parseInt(id, 10),
  );
  const newCrushData = [...filteredCrushes, crush];

  fs.writeFile(`${__dirname}/../crush.json`, JSON.stringify(newCrushData)).then(() =>
    res.status(200).send(crush));
});

module.exports = app;
