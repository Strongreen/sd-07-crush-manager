const express = require('express');
const fs = require('fs');
const STATUSCODE = require('../statusCode.json');

const router = express.Router();
router.use(express.json());

const DATAPATH = `${__dirname}/../crush.json`;

router.get('/', (_request, response) => {
  const crushes = JSON.parse(fs.readFileSync(DATAPATH));
  response.status(STATUSCODE.SUCCESS).json(crushes);
});

module.exports = router;
