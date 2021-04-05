const express = require('express');
const data = require('../crush.json');

const router = express.Router();
const SUCCESS = 200;
const NOTFOUND = 404;

router.get('/', (req, res) => {
  console.log(data.length === 0);
  if (data.length === 0) return res.status(SUCCESS).send([]);
  return res.status(SUCCESS).send(data);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const crush = data.find((item) => item.id.toString() === id);
  console.log(data);
  if (!crush) {
    console.log(crush);
    return res.status(NOTFOUND).send({ message: 'Crush não encontrado' });
  }
  return res.status(SUCCESS).send(crush);
});

module.exports = router;
