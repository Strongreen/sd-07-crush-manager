const express = require('express');
const fs = require('fs').promises;
// const crushData = require('../crush.json');
const { tokenMiddleware } = require('../middleware');

const router = express.Router();

const readingCrushFile = async () => {
  try {
    const crushJson = await fs.readFile(`${__dirname}/../crush.json`);
    return JSON.parse(crushJson.toString('utf-8'));
  } catch (error) {
    throw new Error(error);
  }
};

const writingCrushFile = async (newCrushData) => {
  try {
    return await fs.writeFile(`${__dirname}/../crush.json`, JSON.stringify(newCrushData));
  } catch (error) {
    throw new Error(error);
  }
};

router.get('/', async (_req, res) => {
  const crushResult = await readingCrushFile();
  return res.status(200).send(crushResult);
});

router.get('/:id', async (req, res) => {
  const crushResult = await readingCrushFile();
  const { id } = req.params;
  const filteredCrush = crushResult.find((crush) => crush.id === Number(id));

  if (!filteredCrush) return res.status(404).send({ message: 'Crush não encontrado' });

  return res.status(200).json(filteredCrush);
});

router.use(tokenMiddleware);

router.post('/', async (req, res) => {
  const { name, age, date: { datedAt, rate } } = req.body;
  const crushResult = await readingCrushFile();
  const newCrush = { id: crushResult.length + 1, name, age, date: { datedAt, rate } };

  const newCrushArray = [...crushResult, newCrush];
  await writingCrushFile(newCrushArray);
  return res.status(201).json(newCrush);
});

router.delete('/:id', async (req, res) => {
  const crushResult = await readingCrushFile();
  const { id } = req.params;
  const crushIndex = crushResult.findIndex((crush) => crush.id === Number(id));

  if (crushIndex !== -1) {
    crushResult.splice(crushIndex, 1);
    await writingCrushFile(crushResult);
    return res.status(200).send({ message: 'Crush deletado com sucesso' });
  }
});

module.exports = router;
