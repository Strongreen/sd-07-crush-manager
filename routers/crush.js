const { Router } = require('express');
const path = require('path');
const fs = require('fs').promises;
const { writeCrushFile } = require('../helpers');

const router = Router();

const SUCCESS = 200;
const file = 'crush.json';

const dataCrush = async () => {
  const content = await fs.readFile(path.resolve(__dirname, '..', file));
  return content;
};

router.get('/', async (_req, res) => {
  try {
    const crush = await dataCrush();
    if (crush.length < 1) return res.status(SUCCESS).json(JSON.parse([]));
    res.status(SUCCESS).json(JSON.parse(crush));
  } catch (error) {
    console.log(error);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const crushData = await dataCrush();
  const filterCrush = JSON.parse(crushData).find((crush) => crush.id === Number(id));

  if (!filterCrush) {
    return res.status(404).json({ message: 'Crush não encontrado' });
  }
  res.status(SUCCESS).json(filterCrush);
});

router.post('/', async (req, res) => {
  const { name, age, date } = req.body;
  const crushData = await dataCrush();
  const crushParse = JSON.parse(crushData);
  const newCrush = { id: crushParse.length + 1, name, age, date };
  const newCrushData = [...crushParse, newCrush];
  await writeCrushFile(newCrushData);
  res.status(201).json(newCrush);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, age, date } = req.body;
  const crushData = await dataCrush();
  const newCrush = { id: Number(id), name, age, date };
  const filterCrush = JSON.parse(crushData).filter((crush) => crush.id !== Number(id));
  const newCrushData = [...filterCrush, newCrush];
  await writeCrushFile(newCrushData);
  res.status(200).json(newCrush);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const crushData = await dataCrush();
  const filterCrush = JSON.parse(crushData).filter((crush) => crush.id !== Number(id));
  await writeCrushFile(filterCrush);
  res.status(200).json({ message: 'Crush deletado com sucesso' });
});

module.exports = router;
