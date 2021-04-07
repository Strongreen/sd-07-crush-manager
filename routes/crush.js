const routes = require('express').Router();
const { readCrushes, writeCrushes } = require('../services/functions');

routes.get('/', async (req, res) => {
  const crushes = await readCrushes();
  if (!crushes.length) res.status(200).send([]);
  res.status(200).send(crushes);
});

routes.get('/:id', async (req, res) => {
  const crushes = await readCrushes();
  const { id } = req.params;
  const foundCrush = crushes.find((crush) => crush.id === parseInt(id, 10));
  if (!foundCrush) res.status(404).send({ message: 'Crush não encontrado' });
  res.status(200).send(foundCrush);
});

routes.post('/', async (req, res) => {
  const crush = req.body;
  const crushes = await readCrushes();
  crushes.push(crush);
  writeCrushes(crushes);
  res.status(200).send(crushes);
});

module.exports = routes;
