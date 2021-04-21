const fs = require('fs');
const express = require('express');

const routes = express.Router();

const FILE = 'crush.json';

routes.get('/crush', (req, res) => {
  const file = fs.readFileSync(FILE);
  const dataString = file.toString('utf-8');
  const data = JSON.parse(dataString);

  if (!data.length) return res.status(200).send([]);

  res.status(200).send(data);
});

module.exports = routes;