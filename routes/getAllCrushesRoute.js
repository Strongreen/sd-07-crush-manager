const express = require('express');
const rescue = require('express-rescue');
const { readFile } = require('../helpers/util');

const router = express.Router();

router.get('/', rescue(async (_req, res) => {
  try {
    res.status(200).send(await readFile('crush'));
  } catch (error) {
    throw new Error(error);
  }
}));

module.exports = router;
