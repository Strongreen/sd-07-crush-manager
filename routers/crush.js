const express = require('express');

const router = express.Router();
const data = require('../crush.json');

router.get('/', (req, res) => {
    if (data.length === 0) return ([]);
    return res.status(200).send(data);
  });

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  return res.status(200).send(data.find((value) => value.id === id));
});

module.exports = router;