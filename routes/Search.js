const express = require('express');
const fs = require('fs').promises;

const Search = express();
const SUCCESS = 200;
const NAO_ENCONTRADO = 404;

const readData = async () => {
  const data = JSON.parse(await fs.readFile(__dirname + '/../crush.json'));
  return data;
}

Search.get('/', async (_request, response, next) => {
  try {
    const data = await readData();
    if (!data.length) return response.status(SUCCESS).send([]);
    return response.status(SUCCESS).send(data);
  } catch (error) {
    console.log(error);
    next({
      status: NAO_ENCONTRADO,
      message: error.message,
    });
    throw new Error(error);
  }
});

Search.get('/:id', async (request, response, next) => {
  try {
    const { id } = request.params;
    const data = await readData();
    const crush = data.find(obj => obj.id == id);
    if (!crush) throw new Error('Crush não encontrado');
    return response.status(SUCCESS).send(crush);
  } catch (error) {
    console.log(error);
    next({
      status: NAO_ENCONTRADO,
      message: error.message,
    });
    throw new Error(error);
  }
});

module.exports = Search;
