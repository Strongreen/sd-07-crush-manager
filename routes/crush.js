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

routeCrush.get('/search', validCrush[0], async (req, res) => {
  const { q } = req.query;
  const dataCrush = await readCrush();
  const filterCrush = dataCrush.filter((e) => e.name.toLowerCase().includes(q.toLowerCase()));
  if (filterCrush.length === 0) {
    return res.status(200).send(dataCrush);
  }
  return res.status(200).send(filterCrush);
});

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

routeCrush.delete('/:id', validCrush[0], async (req, res) => {
  const id = Number(req.params);
  const dataCrush = await readCrush();
  const filterIdData = dataCrush.find((element) => element.id !== id);
  await writeCrush(filterIdData);
  return res.status(200).send({ message: 'Crush deletado com sucesso' });
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
  const id = Number(req.params.id);
  const data = req.body;
  const dataCrush = await readCrush();
  const newCrush = { id, ...data };
  const filterIdData = await dataCrush.filter((element) => element.id !== id);
  const newData = [...filterIdData, newCrush];
  await writeCrush(newData);
  res.status(200).send(newCrush);
});

module.exports = routeCrush;
