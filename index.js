const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const NOT_FOUND = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

const getJSON = () => JSON.parse(fs.readFileSync('./crush.json', 'utf-8'));

app.get('/crush', (req, res) => {
  const crushJSON = getJSON();
  res.status(SUCCESS).json(crushJSON);
});

app.get('/crush/:id', (req, res) => {
  const { id } = req.params;
  const filteredCrush = getJSON().find((crush) => crush.id === Number(id));
  if (filteredCrush) {
    res.status(SUCCESS).json(filteredCrush);
  } else {
    res.status(NOT_FOUND).json({ message: 'Crush não encontrado' });
  }
});

app.listen(PORT, () => { console.log('Online'); });
