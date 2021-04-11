const routes = require('express').Router();
const { readCrushes, writeCrushes } = require('../services/functions');

const auth = require('../middlewares/auth');
const { crushValidation, dateValidation } = require('../middlewares/crushValidation');

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

routes.use(auth);
routes.use(crushValidation);
routes.use(dateValidation);

routes.post('/', async (req, res) => {
  const { name, age, date } = req.body;
  const crushes = await readCrushes();
  const crush = {
    name,
    age,
    id: crushes.length + 1,
    date,
  };
  crushes.push(crush);
  writeCrushes(crushes);
  res.status(200).send(crushes);
});

module.exports = routes;
