const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const NOT_FOUND = 404;
const BAD_REQUEST = 400;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

const getJSON = () => JSON.parse(fs.readFileSync('./crush.json', 'utf-8'));

app.get('/crush', (_req, res) => {
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

const generateToken = (length) => crypto.randomBytes(length).toString('hex');

app.post('/login', (req, res) => {
  console.log('po');
  const { email, password } = req.body;
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!email) {
    res.status(BAD_REQUEST).json({ message: 'O campo "email" é obrigatório' });
  } else if (!regex.test(email)) {
    res.status(BAD_REQUEST).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  if (!password) {
    res.status(BAD_REQUEST).json({ message: 'O campo "password" é obrigatório' });
  } else if (password.length < 6) {
    res.status(BAD_REQUEST).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  const tokenLength = 8;
  res.status(SUCCESS).json({ token: generateToken(tokenLength) });
});

app.listen(PORT, () => { console.log('Online'); });
