const fs = require('fs');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./crush.json'), 'utf8');
  res.send(data);

  if (data) {
    return res.status(200).send(data);
  }
});

module.exports = app;
