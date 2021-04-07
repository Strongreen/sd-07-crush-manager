const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(PORT, () => { console.log('Online'); });

const getCrushList = () => {
  try {
    return JSON.parse(fs.readFileSync('./crush.json', 'utf-8'));
  } catch (err) {
    console.error(`Erro ao ler o arquivo: ${err.path}`);
  }
};

app.get('/crush', (_req, res) => {
  const crushList = getCrushList();
  if (crushList.length !== 0) {
    res.status(SUCCESS).send(crushList);
  } else {
    res.status(SUCCESS).send([]);
  }
});

app.get('/crush/:id', (req, res) => {
  const crushList = getCrushList();
  const { id } = req.params;
  const result = crushList.find((crush) => crush.id === Number(id));
  if (result) {
    res.status(SUCCESS).send(result);
  } else {
    res.status('404').send({
      message: 'Crush não encontrado',
    });
  }
});

const validateEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

const validatePassword = (password) => {
  if (password.length >= 6) {
    return true;
  } return false;
};

const generateToken = () => crypto.randomBytes(8).toString('hex');

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    res.status('400').send({ message: 'O campo "email" é obrigatório' });
  } else if (!validateEmail(email)) {
    res.status('400').send({ message: 'O "email" deve ter o formato "email@email.com"' });
  } else if (!password) {
    res.status('400').send({ message: 'O campo "password" é obrigatório' });
  } else if (!validatePassword(password)) {
    res.status('400').send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  } else {
    return res.status(SUCCESS).send({ token: `${generateToken()}` });
  }
});
