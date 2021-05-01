const express = require('express');
const crush = require('../crush.json');

const app = express();

app.get('/crush', async (req, res) => {
  if (crush.length === 0) {
    res.status(200).send([]);
  }
  
  res.status(200).send(crush);
});

module.exports = app;