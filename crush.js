const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const crush = './crush.json';

const app = express();

app.use(bodyParser.json());

const crushData = () => fs.promises.readFile(crush, 'utf-8');

app.get('/', async (_req, res) => {
  res.status(200).json(JSON.parse(await crushData()));
});

module.exports = app;
