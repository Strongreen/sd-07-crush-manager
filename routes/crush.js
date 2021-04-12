const express = require('express');
const data = require('../data/crushs.json');

const app = express();

const SUCCESS = 200;

app.get('/', (_req, res) => {
  res.status(SUCCESS).send(data);
});

module.exports = app;
