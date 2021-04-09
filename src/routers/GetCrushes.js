const fs = require('fs').promises;
const express = require('express');

const Crush = express.Router();

const getCrushes = async () => {
  const result = await fs.readFile(`${__dirname}/../data/crush.json`);
  return result;
};

Crush.get('/', async (_req, res) => {
  const noCrush = [];
  try {
    const crush = await getCrushes();
    if (crush.length !== 0) return res.status(200).send(crush);
    return res.status(200).send(noCrush);
  } catch (error) {
    console.log(error);
  }
});

module.exports = Crush;
