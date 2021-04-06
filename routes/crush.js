const routes = require('express').Router();
const functions = require('../services/functions');

const { readCrushes } = functions;

routes.get('/', async (req, res) => {
  const crushes = await readCrushes();
  if (!crushes.length) res.status(200).send([]);
  res.status(200).send(crushes);
});

routes.get('/:id', async (req, res) => {
  const crushes = await readCrushes();
  console.log(crushes);
  const { id } = req.params;
  const foundCrush = crushes.find((crush) => crush.id === parseInt(id, 10));
  if (!foundCrush) res.status(404).send({ message: 'Crush não encontrado' });
  res.status(200).send(foundCrush);
});

module.exports = routes;
