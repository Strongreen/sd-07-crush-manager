const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const crushFile = () => fs.promises.readFile('./crush.json', 'utf8');

const app = express();
app.use(bodyParser.json());

app.get('/', (_req, res) => {
  res.status(200).json(JSON.parse(crushFile));
});

function isValidId(id) {
  const crushFileArray = JSON.parse(crushFile);
  return crushFileArray.find((item) => item.id.toString() === id);
}

app.get('/:id', (req, res) => {
  const isId = isValidId(req.params.id);
  if (isId) {
    res.status(200).send(isId);
  } else {
    res.status(404).send({ message: 'Crush não encontrado' });
  }
});

app.use((err, _req, res, _next) => {
  res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`);
});

module.exports = app;
