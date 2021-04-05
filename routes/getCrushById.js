const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const STATUSCODE = require('../statusCode.json');

const app = express.Router();
app.use(bodyParser.json());

const DATAPATH = `${__dirname}/../crush.json`;

app.get('/:id', (request, response) => {
  const { id } = request.params;
  const crushes = JSON.parse(fs.readFileSync(DATAPATH));
  const crush = crushes.find((data) => data.id === parseInt(id, 10));
  if (crush) response.status(STATUSCODE.SUCCESS).json(crush);
  response.status(STATUSCODE.NOT_FOUND).json({ message: 'Crush não encontrado' });
});

module.exports = app;
