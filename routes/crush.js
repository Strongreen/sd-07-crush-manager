const express = require('express');
const rescue = require('express-rescue');
const fs = require('fs').promises;
const crush = require('../crush.json');
const { dataCrushMiddleware, tokenMiddleware } = require('../middlewares');

const router = express.Router();

router.get('/', rescue(async (_req, res) => {
  try {
    const responseCrush = await fs.readFile(`${__dirname}/../crush.json`);
    const responseCrushJSON = JSON.parse(responseCrush.toString('utf-8'));
    res.status(200).send(responseCrushJSON);
  } catch (error) {
    return error;
  }
}));

router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  if (crush[id - 1]) {
    res.status(200).send(crush[id - 1]);
  } else {
    res.status(404).send({
      message: 'Crush não encontrado',
    });
  }
});

router.use(tokenMiddleware);
router.use(dataCrushMiddleware);

router.post('/', rescue(async (req, res) => {
  const { name, age, date } = req.body;
  const newCrushObject = { id: crush.length + 1, name, age, date };
  const crushDocument = [...crush, newCrushObject];

  try {
    await fs.writeFileSync(`${__dirname}/../crush.json`, JSON.stringify(crushDocument));
    return res.status(201).send(newCrushObject);
  } catch (error) {
    return error;
  }
}));

module.exports = router;
