const express = require('express');
const fs = require('fs');
const { SUCCESS } = require('../statusCode.json');

const router = express.Router();
router.use(express.json());

const DATAPATH = `${__dirname}/../crush.json`;

router.get('/', (_request, response) => {
  const crushes = JSON.parse(fs.readFileSync(DATAPATH));
  response.status(SUCCESS).json(crushes);
});

module.exports = router;
