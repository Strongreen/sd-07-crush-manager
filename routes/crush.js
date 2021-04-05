const express = require('express');
const crushData = require('../crush.json');

const router = express.Router();

router.get('/', (_req, res) => {
  if (crushData.length === 0) {
    res.status(200).send([]);
  }

  res.status(200).send(crushData);
});

// router.get('/:id', (req, res) => {
//   const id = req.params.id;

// });

module.exports = router;
