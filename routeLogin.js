const express = require('express');

const app = express();
const crypto = require('crypto');

function verifyEmail(email) {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}

function verifyPassword(password) {
  return password.toString().length < 6;
}

const errNoEmail = { message: 'O campo "email" é obrigatório' };
const errNoPassword = { message: 'O campo "password" é obrigatório' };
const errInvalidEmail = { message: 'O "email" deve ter o formato "email@email.com"' };
const errInvalidPassword = { message: 'A "senha" deve ter pelo menos 6 caracteres' };

app.post('/', (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).send(errNoEmail);
  if (!password) return res.status(400).send(errNoPassword);
  if (verifyPassword(password)) return res.status(400).send(errInvalidPassword);
  if (!verifyEmail(email)) return res.status(400).send(errInvalidEmail);

  const token = crypto.randomBytes(8).toString('hex');
  return res.status(200).send({ token });
});

module.exports = app;
