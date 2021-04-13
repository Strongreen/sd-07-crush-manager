const express = require('express');
const fs = require('fs');

const app = express();

app.get('/', async (req, res) => {
  const data = await JSON.parse(await fs.promises.readFile('./crush.json', 'utf-8'));
  res.status(200).send(data);
});

app.get('/:id', async (req, res) => {
  const data = await JSON.parse(await fs.promises.readFile('./crush.json', 'utf-8'));
  const { id } = req.params;
  const crushById = data.find((c) => c.id === parseInt(id, 10));

  if (!crushById) {
    res.status(404).send({
      message: 'Crush não encontrado',
    });
  }

  res.status(200).send(crushById);
});

module.exports = app;