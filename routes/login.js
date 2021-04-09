const express = require('express');
const crypto = require('crypto');

const app = express();

// Desafio 3
function verifyEmail(email) {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}

app.post('/', (req, res) => {
  const { email, password } = req.body;
  const emailIsValid = verifyEmail(email);
  const token = crypto.randomBytes(8).toString('hex');
  if (!email) {
    return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  } if (!emailIsValid) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  } if (!password) {
    return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  } if (password.length < 6) {
    return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return res.status(200).send({ token });
});

module.exports = app;