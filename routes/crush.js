const express = require('express');
const fs = require('fs').promises;

const crush = express.Router();

function readCrushesFile() {
  return fs.readFile(`${__dirname}/../crush.json`, 'utf-8')
    .then((content) => JSON.parse(content))
    .catch((err) => console.log(err.message));
}

const SUCCESS = 200;

crush.get('/', async (_request, response) => {
  try {
    const result = await readCrushesFile();
    response.status(SUCCESS).send(result);
  } catch (err) {
    response.status(300).send('Este é o erro');
  }
});

module.exports = crush;
