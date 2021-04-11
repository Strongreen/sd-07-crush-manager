const fs = require('fs').promises;
const express = require('express');
const path = require('path');

const router = express.Router();

const readCrushFile = async () => {
  const content = await fs.readFile(path.resolve(__dirname, '.', 'crush.json'));
  return JSON.parse(content.toString('utf-8'));
};

router.get('/', async (req, res) => {
  const result = await readCrushFile();
  res.status(200).send(result);
});

module.exports = router;