const express = require('express');
const fs = require('fs');

const app = express();

const readingFile = async () => {
  const file = await fs.promises.readFile(`${__dirname}/../crush.json`);
  return JSON.parse(file);
};

app.get('/', async (req, res) => {
  const toRead = await readingFile();
  res.status(200).send(toRead);
});

app.get('/:id', async (req, res) => {
  const readFileF = await readingFile();
  
  const { id } = req.params;
  const getId = readFileF.find((findId) => findId.id === parseFloat(id));

  if (!getId) {
    return res.status(404).json({
      message: 'Crush não encontrado',
    });
  }

  return res.status(200).json(getId);
});

module.exports = app;