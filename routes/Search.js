const express = require('express');
const fs = require('fs').promises;
const { Auth } = require('../middleware');

const Search = express();
const SUCCESS = 200;
const NAO_ENCONTRADO = 404;

const readData = async () => {
  const data = JSON.parse(await fs.readFile(`${__dirname}/../crush.json`));
  return data;
};

Search.get('/', async (_request, response, next) => {
  try {
    const data = await readData();
    if (!data.length) return response.status(SUCCESS).send([]);
    return response.status(SUCCESS).send(data);
  } catch (error) {
    console.log(error);
    return next({
      status: NAO_ENCONTRADO,
      message: error.message,
    });
  }
});

Search.get('/search', Auth, async (request, response, next) => {
  try {
    const { q } = request.query;
    const data = await readData();
    const crush = data.filter((c) => {
      let obj;
      if (c.name.includes(q)) obj = c;
      return obj;
    });
    if (!crush) throw new Error('Crush não Encontrado');
    return response.status(SUCCESS).send(crush);
  } catch (error) {
    console.log(error);
    next({
      status: NAO_ENCONTRADO,
      message: error.message,
    });
  }
});

Search.get('/:id', async (request, response, next) => {
  try {
    const { id } = request.params;
    const data = await readData();
    const crush = data.find((obj) => parseInt(obj.id, 10) === parseInt(id, 10));
    if (!crush) throw new Error('Crush não encontrado');
    return response.status(SUCCESS).send(crush);
  } catch (error) {
    console.log(error);
    return next({
      status: NAO_ENCONTRADO,
      message: error.message,
    });
  }
});

module.exports = Search;
