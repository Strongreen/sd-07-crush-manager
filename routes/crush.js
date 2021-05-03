const express = require('express');
const fs = require('fs').promises;
const midwares = require('../middlewares/index');
const data = require('../crush.json');

const app = express();

app.get('/', async (_req, res) => {
  const response = await fs.readFile(`${__dirname}/../crush.json`, 'utf8');
  res.status(200).send(JSON.parse(response));
});

app.get('/search', midwares.authorizationMid, async (req, res) => {
  const searchTerm = req.query.q;
  if (searchTerm === undefined || searchTerm === '') {
    res.status(200).send(data);
  }
  const response = await fs.readFile(`${__dirname}/../crush.json`, 'utf8');
  const filteredData = JSON.parse(response).filter(({ name }) =>
    name.includes(searchTerm),
  );

  res.status(200).send(filteredData);
});

app.get('/:id', (req, res) => {
  const { id } = req.params;
  const crushById = data.find((element) => element.id === parseInt(id, 10));

  if (!crushById) {
    res.status(404).send({
      message: 'Crush não encontrado',
    });
  }

  res.status(200).send(crushById);
});

app.use(midwares.authorizationMid);

app.delete('/:id', (req, res) => {
  const { id } = req.params;

  const filteredData = data.filter(
    (element) => element.id !== parseInt(id, 10),
  );

  fs.writeFile(
    `${__dirname}/../crush.json`,
    JSON.stringify(filteredData),
  ).then(() => res.status(200).send({ message: 'Crush deletado com sucesso' }));
});

app.use(midwares.checkNameMid);
app.use(midwares.checkAgeMid);
app.use(midwares.dateMid);

app.post('/', (req, res) => {
  const object = { id: data.length + 1, ...req.body };
  const newData = [...data, object];

  fs.writeFile(`${__dirname}/../crush.json`, JSON.stringify(newData)).then(() =>
    res.status(201).send(object),
  );
});

app.put('/:id', (req, res) => {
  const { id } = req.params;

  const crush = { id: parseInt(id, 10), ...req.body };
  const filteredData = data.filter(
    (element) => element.id !== parseInt(id, 10),
  );
  const newData = [...filteredData, crush];

  fs.writeFile(`${__dirname}/../crush.json`, JSON.stringify(newData)).then(() =>
    res.status(200).send(crush),
  );
});

module.exports = app;
