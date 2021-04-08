const express = require('express');
const fs = require('fs');
const { tokenMiddleware, newEntryMiddleware } = require('../middleware');

const router = express.Router();

const readingCrushFile = () => {
  try {
    const crushJson = fs.readFileSync(`${__dirname}/../crush.json`);
    return JSON.parse(crushJson.toString('utf-8'));
  } catch (error) {
    return error;
  }
};

const writingCrushFile = (newCrushData) => {
  try {
    return fs.writeFileSync(`${__dirname}/../crush.json`, JSON.stringify(newCrushData));
  } catch (error) {
    return error;
  }
};

router.get('/', (_req, res) => {
  const crushResult = readingCrushFile();
  return res.status(200).json(crushResult);
});

router.post('/', tokenMiddleware, newEntryMiddleware, (req, res) => {
  const crushResult = readingCrushFile();
  const { name, age, date: { datedAt, rate } } = req.body;
  const newCrush = { id: crushResult.length + 1, name, age, date: { datedAt, rate } };
  const newCrushArray = [...crushResult, newCrush];

  try {
    writingCrushFile(newCrushArray);
    return res.status(201).json(newCrush);
  } catch (error) {
    return error;
  }
});

router.get('/search', tokenMiddleware, (req, res) => {
  const { q } = req.query;
  const crushResult = readingCrushFile();

  if (!q) return res.status(200).json(crushResult);

  const searchedTerm = crushResult.filter((crush) => crush.name.includes(q));

  return res.status(200).json(searchedTerm);
});

router.get('/:id', (req, res) => {
  const crushResult = readingCrushFile();
  const { id } = req.params;
  const filteredCrush = crushResult.find((crush) => crush.id === Number(id));

  if (filteredCrush) return res.status(200).json(filteredCrush);

  return res.status(404).send({ message: 'Crush não encontrado' });
});

router.put('/:id', tokenMiddleware, newEntryMiddleware, (req, res) => {
  const crushResult = readingCrushFile();
  const { id } = req.params;
  const { name, age, date: { datedAt, rate } } = req.body;
  const crushIndex = crushResult.findIndex((crush) => crush.id === Number(id));
  const updatedCrush = { id: crushIndex + 1, name, age, date: { datedAt, rate } };
  
  try {
    crushResult.splice(crushIndex, 1, updatedCrush);
    writingCrushFile(crushResult);
    return res.status(200).json(updatedCrush);
  } catch (error) {
    return error;
  }
});

router.delete('/:id', tokenMiddleware, (req, res) => {
  const crushResult = readingCrushFile();
  const { id } = req.params;
  const crushIndex = crushResult.findIndex((crush) => crush.id === Number(id));

  if (crushIndex !== -1) {
    crushResult.splice(crushIndex, 1);
    writingCrushFile(crushResult);
    return res.status(200).json({ message: 'Crush deletado com sucesso' });
  }
});

module.exports = router;
