const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const checkPassword = (password) => {
  const minLength = 6;
  let message = null;
  if (!password) {
    message = 'O campo "password" é obrigatório';
  } else if (password.toString().length < minLength) {
    message = 'A "senha" deve ter pelo menos 6 caracteres';
  }
  return message;
};

const checkEmail = (email) => {
  let message = null;
  if (!email) {
    message = 'O campo "email" é obrigatório';
  } else if (!/[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i.test(email)) {
    message = 'O "email" deve ter o formato "email@email.com"';
  }
  return message;
};

app.post('/', async (req, res) => {
  const { email, password } = req.body;
  const validPassw = await checkPassword(password);
  const validEmail = await checkEmail(email);

  if (validEmail !== null) {
    return res.status(400).json({ message: validEmail });
  }
  if (validPassw !== null) {
    return res.status(400).json({ message: validPassw });
  }
  return res.status(200).send({ token: crypto.randomBytes(8).toString('hex') });
  // crypto código @carolbezerra-dev
});

module.exports = app;
