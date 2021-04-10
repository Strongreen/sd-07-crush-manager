const fs = require('fs');
const express = require('express');

const app = express();

app.get('/:id', (req, res) => {
  const { id } = req.params;
  const data = JSON.parse(fs.readFileSync('./crush.json'), 'utf8');
  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/parseInt
  const filteredCrush = data.find((crush) => crush.id === parseInt(id, 10));
  if (filteredCrush) {
    res.status(200).json(filteredCrush);
  }
  res.status(404).json({ message: 'Crush não encontrado' });
});

module.exports = app;
