const express = require('express');

const fs = require('fs').promises;

const token = require('../middlewares/tokenMiddleware');

const app = express();

const getData = async () => {
  try {
    return JSON.parse(await fs.readFile(`${__dirname}/../crush.json`, 'utf8'));
  } catch (error) {
    throw new Error(error);
  }
};

const checkSearchTerm = async (searchTerm) => {
  const data = await getData();
  if (!searchTerm) return data;
  const crushesFound = data.filter((crush) => crush.name.includes(searchTerm));
  if (crushesFound) return crushesFound;
  return [];
};

app.use(token);

app.get('/', async (request, response) => {
  const { q } = request.query;
  const findData = await checkSearchTerm(q);
  response.status(200).send(findData);
});

module.exports = app;
