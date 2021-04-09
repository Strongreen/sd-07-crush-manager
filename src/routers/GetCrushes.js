const fs = require('fs').promises;
const express = require('express');
const path = require('path');

const Crush = express.Router();

const getCrushes = async () => {
  const result = await fs.readFile(path.join(__dirname, '../data/crush.json'));
  return result;
};

Crush.get('/', async (_req, res) => {
  const noCrush = [];
  try {
    const crush = await getCrushes();
    if (crush.length === 0) return res.status(200).send(noCrush);
    return res.status(200).send(crush);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = Crush;