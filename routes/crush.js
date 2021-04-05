const express = require('express');
const fs = require('fs').promises;

const router = express.Router();

const readingCrushFile = async () => {
  try {
    const crushJson = await fs.readFile(`${__dirname}/../crush.json`);
    return JSON.parse(crushJson.toString('utf-8'));
  } catch (error) {
    return error;
  }
};

router.get('/', async (_req, res) => {
  const crushResult = await readingCrushFile();
  res.status(200).send(crushResult);
});

router.get('/:id', async (req, res) => {
  const crushResult = await readingCrushFile();
  const { id } = req.params;
  const filteredCrush = crushResult.find((crush) => crush.id === Number(id));

  if (!filteredCrush) res.status(404).send({ message: 'Crush não encontrado' });

  res.status(200).send(filteredCrush);
});

module.exports = router;
