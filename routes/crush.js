const { Router } = require('express');
const fs = require('fs').promises;
const validCrush = require('../middlewares/validCrush');

const routeCrush = Router();

async function readCrush() {
  return JSON.parse(await fs.readFile('./crush.json', 'utf-8'));
}

async function writeCrush(data) {
  await fs.writeFile('./crush.json', JSON.stringify(data, null, 2));
}

routeCrush.get('/', async (req, res) => {
  const dataCrush = await readCrush();
  return res.status(200).send(dataCrush);
});

routeCrush.get('/:id', async (req, res) => {
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

routeCrush.use(validCrush);

routeCrush.post('/', async (req, res) => {
  const data = req.body;
  const dataCrush = await readCrush();
  const newCrush = { id: dataCrush.length + 1, ...data };
  const newDataCrush = [...dataCrush, newCrush];
  await writeCrush(newDataCrush);
  res.status(201).send(newCrush);
});

routeCrush.put('/:id', async (req, res) => {
  const ind = Number(req.params.id);
  const data = req.body;
  const dataCrush = await readCrush();
  const newCrush = { id: ind, ...data };
  const filterIdData = await dataCrush.filter((element) => element.id !== ind);
  const newData = [...filterIdData, newCrush];
  await writeCrush(newData);
  res.status(200).send(newCrush);
});

module.exports = routeCrush;
