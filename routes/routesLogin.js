const express = require('express');

const generateToken = require('../helpers/generateToken');
const validateEmail = require('../helpers/validateEmail');
const validatePassword = require('../helpers/validatePassword');

const routes = express.Router();

routes.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  if (!password) return res.status(400).send({ message: 'O campo "password" é obrigatório' });

  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);

  if (!isEmailValid) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!isPasswordValid) {
    return res.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }

  const token = generateToken();
  res.status(200).send({ token });
});

module.exports = routes;
