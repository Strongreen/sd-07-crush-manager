const express = require('express');
const rescue = require('express-rescue');
const { readFile } = require('../helpers/util');
const { ErrorHandler } = require('../helpers/error');

const router = express.Router();

router.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const crushes = await readFile('crush');

  const crush = crushes.find((crushCurrent) => crushCurrent.id === parseInt(id, 10));

  if (!crush) {
    throw new ErrorHandler(404, 'Crush não encontrado');
  }

  res.status(200).send(crush);
}));

module.exports = router;
