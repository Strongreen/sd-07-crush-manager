const fs = require('fs');
const express = require('express');
const data = require('../data/crush.json');

const app = express();

const SUCCESS = 200;

app.get('/', (_request, response) => {
  const crushAPI = fs.readFileSync(data, 'utf-8');
  response.status(SUCCESS).json(JSON.parse(crushAPI));
});

module.exports = app;