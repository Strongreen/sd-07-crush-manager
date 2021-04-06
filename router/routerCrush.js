const express = require('express');

const router = express.Router();

const validateToken = require('../middlewares/validateToken');
const { validatesNameAge, validatesDate } = require('../middlewares/validatesData');

const readFileCrush = require('../functions/readFileCrush');
const writeFileCrush = require('../functions/writeFileCrush');

router.get('/', async (_req, res) => {
  const crushsFile = await readFileCrush();
  res.status(200).send(crushsFile);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const crushs = await readFileCrush();
  const crushSelected = crushs.filter((crush) => crush.id === parseInt(id, 10));

  if (crushSelected.length === 0) res.status(404).json({ message: 'Crush não encontrado' });
  res.status(200).send(crushSelected[0]);
});

router.post('/', validateToken, validatesNameAge, validatesDate, async (req, res) => {
  const { name, age, date } = req.body;
  const crushs = await readFileCrush();

  const id = crushs.length + 1;

  const newCrush = { name, age, id, date };
  const newList = [...crushs, newCrush];
  await writeFileCrush(newList);
  res.status(201).send(newCrush);
});

router.put('/:id', validateToken, validatesNameAge, validatesDate, async (req, res) => {
  const { name, age, date } = req.body;
  const { id } = req.params;
  const idNumber = parseInt(id, 10);
  const crushs = await readFileCrush();

  const removeCrush = crushs.filter((crush) => crush.id !== idNumber);
  const crushEdited = { name, age, id: idNumber, date };
  const newList = [...removeCrush, crushEdited];

  await writeFileCrush(newList);

  res.status(200).send(crushEdited);
});

router.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;

  const crushs = await readFileCrush();
  const newList = crushs.filter((crush) => crush.id !== parseInt(id, 10));

  await writeFileCrush(newList);

  res.status(200).json({ message: 'Crush deletado com sucesso' });
});

module.exports = router;
