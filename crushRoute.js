const express = require('express');

const fs = require('fs');

const app = express();

app.get('/', (req, res) => {
  const crushArray = fs.readFileSync('./crush.json', 'utf-8');
  return res.status(200).send(JSON.parse(crushArray));
});

app.get('/:id', (req, res) => {
  const crushArray = JSON.parse(fs.readFileSync('./crush.json', 'utf-8'));
  const { id } = req.params;
  const oneCrush = crushArray.filter((crush) => crush.id === parseInt(id, 10));
  if (oneCrush[0]) {
    return res.status(200).send(oneCrush[0]);
  } 
  return res.status(404).send({
    message: 'Crush não encontrado',
  });
});

module.exports = app;
