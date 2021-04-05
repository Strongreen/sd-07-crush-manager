const express = require('express');
const data = require('../crush.json');

const app = express();

app.get('/', (_req, res) => {
  res.status(200).send(data);
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
