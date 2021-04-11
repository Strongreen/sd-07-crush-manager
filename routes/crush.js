const fs = require('fs').promises;
const express = require('express');

const app = express();

const readCrushFile = async () => {
  const content = await fs.readFile((`${__dirname}/../crush.json`));
  return JSON.parse(content.toString('utf-8'));
};
app.get('/', async (req, res) => {
  const result = await readCrushFile();
  res.status(200).send(result);
});

module.exports = app;