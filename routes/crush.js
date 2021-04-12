const express = require('express');
const crush = require('../crush.json');
const fs = require('fs').promises;
const rescue = require('express-rescue');

const router = express.Router();

router.get('/', rescue (async (_req, res) => {
  try {
    const responseCrush = await fs.readFile(`${__dirname}/../crush.json`);
    res.status(200).send(responseCrush);
  } catch (error) {
    return error;
  }
}));

router.post('/', rescue (async (_req, res) => {
  try {
    const responseCrush = await fs.readFile(`${__dirname}/../crush.json`);
    res.status(200).send(responseCrush);
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

module.exports = router;
