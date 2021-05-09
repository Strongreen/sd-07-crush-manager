const express = require('express');
const randomToken = require('random-token');

const app = express();

app.post('/login', (request, response) => {
  const { email, password } = request.body;
  if (!email) {
    return response.status(400).send({
      message: 'O campo "email" é obrigatório',
    });
  }
  const emailTest = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(email);
  if (!emailTest) {
    return response.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) return response.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    return response.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  response.status(200).send({ token: randomToken(16) });
});

module.exports = app;
