const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const crush = './crush.json';

const app = express();

app.use(bodyParser.json());

const crushData = () => fs.promises.readFile(crush, 'utf-8');

app.get('/', async (_req, res) => {
  res.status(200).json(JSON.parse(await crushData()));
});

const crushIDs = async (id) => {
  const findID = JSON.parse(await crushData());
  return findID.find((crushInfos) => crushInfos.id.toString() === id);
};

app.get('/:id', async (req, res) => {
  const { id } = req.params;
  const IDmatch = await crushIDs(id);
  if (!IDmatch) {
    return res.status(404).json({ message: 'Crush não encontrado' });
  }
  return res.status(200).json(IDmatch);
});

module.exports = app;
