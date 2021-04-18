const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

function nullOrEmpty(value) {
  if (!value || value === '') return true;
  return false;
}

function checkEmail(email) {
  const mailFormat = /\b[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}\b/g;

  if (nullOrEmpty(email)) {
    throw new Error('O campo "email" é obrigatório');
  }

  if (!email.match(mailFormat)) {
    throw new Error('O "email" deve ter o formato "email@email.com"');
  }
}

function check(password) {
  if (nullOrEmpty(password)) {
    throw new Error('O campo "password" é obrigatório');
  }

  if (password.toString().length < 6) {
    throw new Error('A "senha" deve ter pelo menos 6 caracteres');
  }
}

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./crush.json', 'utf8'));
  if (data.length > 0) {
    res.status(200).send(data);
  } else {
    res.status(200).send([]);
  }
});

app.get('/crush/:id', (req, res) => {
  const { id } = req.params;
  const data = JSON.parse(fs.readFileSync('./crush.json', 'utf8'));
  // const result = data.filter((element) => element.id === Number(id))[0];
  const result = data.find((element) => element.id === parseInt(id, 10));
  if (!result) {
    res.status(404).send({
      message: 'Crush não encontrado',
    });
  }
  res.status(200).send(result);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  try {
    checkEmail(email);
    check(password);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

  const token = crypto.randomBytes(8).toString('hex');
  res.json({ token });
});

app.listen(PORT, () => { console.log('Online'); });
