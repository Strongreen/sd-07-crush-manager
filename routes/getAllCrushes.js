const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const STATUSCODE = require('../statusCode.json');

const app = express.Router();
app.use(bodyParser.json());

const DATAPATH = `${__dirname}/../crush.json`;

app.get('/', (_request, response) => {
  const crushes = JSON.parse(fs.readFileSync(DATAPATH));
  response.status(STATUSCODE.SUCCESS).json(crushes);
});

module.exports = app;
