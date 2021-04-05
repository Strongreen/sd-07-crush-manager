const express = require('express');
const data = require('../crush.json');

const router = express.Router();
const SUCCESS = 200;

router.get('/', (req, res) => {
  console.log(data.length === 0);
  if (data.length === 0) return res.status(SUCCESS).send([]);
  return res.status(SUCCESS).send(data);
});

module.exports = router;
