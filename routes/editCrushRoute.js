const express = require('express');
const rescue = require('express-rescue');
const { readFile, whriteFile } = require('../helpers/util');
const middlewares = require('../middlewares');

const router = express.Router();

router.use(middlewares.validateTokenMiddleware);
router.use(middlewares.validateCrushMiddleware);
router.put('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const { name, age, date } = req.body;

  const crushes = await readFile('crush');
  const crushIndex = crushes.findIndex((crush) => crush.id === parseInt(id, 10));
  crushes[crushIndex] = { id: parseInt(id, 10), name, age, date: { ...date } };

  await whriteFile('crush', crushes);
  res.status(200).send(crushes[crushIndex]);
}));

module.exports = router;
