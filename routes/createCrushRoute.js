const express = require('express');
const rescue = require('express-rescue');
const { readFile, whriteFile } = require('../helpers/util');
const middlewares = require('../middlewares');

const router = express.Router();

router.use(middlewares.validateTokenMiddleware);
router.use(middlewares.validateCrushMiddleware);
router.post('/', rescue(async (req, res) => {
  const { name, age, date } = req.body;

  const crushes = await readFile('crush');
  const newCrush = {
    id: crushes.length + 1,
    name,
    age,
    date,
  };

  crushes.push(newCrush);
  await whriteFile('crush', crushes);
  res.status(201).send(newCrush);
}));

module.exports = router;
