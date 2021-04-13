const express = require('express');
const fs = require('fs');

const app = express();

app.get('/', async (req, res) => {
  const data = await fs.promises.readFile('./crush.json', 'utf-8');
  res.status(200).send(JSON.parse(data));
});

module.exports = app;