const express = require('express');
const fs = require('fs');
const data = require('../crush.json');

const app = express();

app.get('/', async (_req, res) => {
  const response = await fs.promises.readFile(
    `${__dirname}/../crush.json`,
    'utf8',
  );
  res.status(200).send(JSON.parse(response));
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

module.exports = app;
