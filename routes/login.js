const validator = require('email-validator');
const randtoken = require('rand-token');

const express = require('express');

const app = express.Router();
// --------------------- REQ 3 ---------------------
app.post('/', (request, response) => {
  const { email, password } = request.body;
  const token = randtoken.generate(16);
  if (!email) {
    return response.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validator.validate(email)) {
    return response.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return response.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return response.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  response.status(200).json({ token });
});

module.exports = app;