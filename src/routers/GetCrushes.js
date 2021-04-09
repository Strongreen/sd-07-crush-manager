const fs = require('fs').promises;
const express = require('express');

const Crush = express.Router();

Crush.get('/', async (_req, res) => {
  const noCrush = [];
  const result = await fs.readFile(`${__dirname}/../data/crush.json`);
  const crush = result;
  try {
    if (crush.length !== 0) return res.status(200).send(JSON.parse(crush));
    return res.status(200).send(noCrush);
  } catch (error) {
    console.log(error);
  }
});

module.exports = Crush;
