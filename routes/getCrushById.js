const express = require('express');
const fs = require('fs');
const { NOT_FOUND, SUCCESS } = require('../statusCode.json');

const router = express.Router();
router.use(express.json());

const DATAPATH = `${__dirname}/../crush.json`;

router.get('/:id', (request, response) => {
  const { id } = request.params;
  const crushes = JSON.parse(fs.readFileSync(DATAPATH));
  const crush = crushes.find((data) => data.id === parseInt(id, 10));
  if (crush) response.status(SUCCESS).json(crush);
  response.status(NOT_FOUND).json({ message: 'Crush não encontrado' });
});

module.exports = router;
