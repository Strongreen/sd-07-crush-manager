const express = require('express');
const fs = require('fs').promises;

const app = express();

const readCrushes = async () => {
  const data = await fs.readFile(`${__dirname}/../crush.json`, 'utf-8');
  return JSON.parse(data);
};

app.get('/', async (_req, res) => {
  const crushes = await readCrushes();
  res.status(200).send(crushes);
});

module.exports = app;
