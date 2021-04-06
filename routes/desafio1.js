const express = require('express');
const crush = require('../crush.json');

const app = express();

app.get('/', (req, res) => {
  res.status(200).send(crush);
});

module.exports = app;
