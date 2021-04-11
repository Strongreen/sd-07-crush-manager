const fs = require('fs').promises;
const path = require('path');
const express = require('express');

const router = express.Router();

const readCrushFile = async () => {
  const content = await fs.readFile(path.resolve(__dirname, '..', 'crush.json'));
  return JSON.parse(content.toString('utf-8'));
};

router.get('/', async (req, res) => {
  const result = await readCrushFile();
  res.status(200).send(result);
});

router.get('/:id', async (req, res) => {
  const result = await readCrushFile();
  const { id } = req.params;
  const filterCrush = result.find((crush) => crush.id === id);
  if (!filterCrush) {
    res.status(404).json({ message: 'Crush não encontrado' });
  } 
  return res.status(200).json(filterCrush);
});

module.exports = router;