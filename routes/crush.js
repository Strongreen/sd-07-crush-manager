const routes = require('express').Router();
const { resolve } = require('path');
const { readFile } = require('fs').promises;
// const fs = require('fs');

const crushFile = '../crush.json';

routes.get('/', async (req, res) => {
  const crushes = JSON.parse(await readFile(resolve(__dirname, crushFile), 'utf-8'));
  if (!crushes.length) res.status(200).send([]);
  res.status(200).send(crushes);
});

module.exports = routes;
