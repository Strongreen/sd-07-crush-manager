const fs = require('fs').promises;
const express = require('express');

const Crush = express.Router();

const getCrushes = async () => {
  const result = await fs.readFile(`${__dirname}/../data/crush.json`);
  return result;
};

Crush.get('/', async (_req, res) => {
  const noCrush = [];
  const crush = await getCrushes();
  try {
    if (crush.length === 0) return res.status(200).send(noCrush);
    res.status(200).send(JSON.parse(crush));
  } catch (error) {
    console.log(error);
  }
});

module.exports = Crush;
