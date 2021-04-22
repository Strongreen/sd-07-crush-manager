const express = require('express');
const fs = require('fs').promises;

const crushRoute = express();

const readCrushFile = async () => {
  try {
    const crush = await fs.readFile(`${__dirname}/../crush.json`, 'utf8');
    return JSON.parse(crush);
  } catch (err) {
    throw new Error('Erro na leitura do arquivo!');
  }
};

crushRoute.get('/', async (req, res) => {
  try {
    const result = await readCrushFile();
    res.status(200).send(result);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = crushRoute;