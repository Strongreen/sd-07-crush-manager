const express = require('express');
const fs = require('fs').promises;

const app = express();

const readCrush = async () => JSON.parse(await fs.readFile('./crush.json', 'utf8'));

app.get('/', async (req, res) => {
  const dataCrush = await readCrush();
  return res.status(200).send(dataCrush);
});

app.get('/:id', async (req, res) => {
  const { id } = req.params;
  const dataCrush = await readCrush();
  const filterIdData = dataCrush.find((element) => element.id === Number(id));
  if (!filterIdData) {
    return res.status(404).send({
      message: 'Crush não encontrado',
    });
  }
  return res.status(200).send(filterIdData);
});

module.exports = app;
