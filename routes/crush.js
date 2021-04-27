const express = require('express');
const fs = require('fs').promises;

const crush = express.Router();

function readCrushesFile() {
  return fs.readFile(`${__dirname}/../crush.json`, 'utf-8')
  .then((content) => JSON.parse(content))
  .catch((err) => console.log(err.message));
}

const SUCCESS = 200;

crush.get('/:id', async (request, response) => {
  try {
    console.log(request.params);
    const result = await readCrushesFile();
    const crushId = result.find((crushData) => crushData.id === Number(request.params.id));
    if (crushId) {
      return response.status(SUCCESS).send(crushId);
    }
    const message = {
      message: 'Crush não encontrado',
    };
    return response.status(404).send(message);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

crush.get('/', async (request, response) => {
  try {
    const result = await readCrushesFile();
    response.status(SUCCESS).send(result);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

module.exports = crush;
