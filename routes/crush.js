const express = require('express');
const crush = require('../crush.json');

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).send(crush);
});

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
