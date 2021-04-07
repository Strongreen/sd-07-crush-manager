const express = require('express');
// const rescue = require('express-rescue');
const fs = require('fs');

const app = express();

app.get('/', (req, res) => {
    const data = JSON.parse(fs.readFileSync('./crush.json'), 'utf8');
    res.send(data);
    if (data.length !== 0) {
      return res.status(200).json([]);
    }
    if (data) {
      return res.status(200).send(data);
    }
  });

  module.exports = app;
