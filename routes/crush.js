const fs = require('fs');
const express = require('express');
// const rescue = require('express-rescue');
// const router = express.Router();

const app = express();

app.get('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./crush.json'), 'utf8');
  res.send(data);
  // if (data.length !== 0) {
  //   return res.status(200).json([]);
  // }
  if (data) {
    return res.status(200).send(data);
  }
});

app.get('/:id', (req, res) => {
  const { id } = req.params;
  const data = JSON.parse(fs.readFileSync('./crush.json'), 'utf8');
  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/parseInt
  const filteredCrush = data.find((crush) => crush.id === parseInt(id, 10));
  console.log(filteredCrush);
  if (filteredCrush) {
    res.status(200).json(filteredCrush);
  }
  res.status(404).json({ message: 'Crush não encontrado' });
});

module.exports = app;