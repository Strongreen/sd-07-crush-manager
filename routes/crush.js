const express = require('express');
const fs = require('fs').promises;

const app = express();

const readCrushes = async () => {
  const data = await fs.readFile(`${__dirname}/../crush.json`, 'utf-8');
  return JSON.parse(data);
};

app.get('/', async (_req, res) => {
  const crushes = await readCrushes();
  res.status(200).send(crushes);
});

app.get('/:id', async (req, res) => {
  const crushes = await readCrushes();
  const { id } = req.params;
  const validateId = crushes.some((crush) => crush.id === Number(id));

  if (!validateId) {
    res.status(404).send({
    message: 'Crush não encontrado',
    });
  }
  const crushById = crushes.find((crush) => crush.id === Number(id));
  res.status(200).send(crushById);
});

module.exports = app;
