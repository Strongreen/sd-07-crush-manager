const express = require('express');
const fs = require('fs');

const app = express();

app.get('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync(`${__dirname}/../crush.json`, 'utf8'));
  res.status(200).send(data);
});

app.get('/:id', (req, res) => {
  const { id } = req.params;
  const data = JSON.parse(fs.readFileSync(`${__dirname}/../crush.json`, 'utf8'));
  try {
    const crushID = data[id - 1];
    if (!crushID) {
      throw new Error('Crush não encontrado');
    }
    res.status(200).send(crushID);
  } catch (error) {
    res.status(404).send({
      message: error.message,
    });
  }
});

module.exports = app;
