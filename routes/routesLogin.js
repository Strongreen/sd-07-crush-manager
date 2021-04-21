const express = require('express');

const generateToken = require('../helpers/generateToken');
const validateEmail = require('../helpers/validateEmail');
const verifyPass = require('../helpers/verifyPass');

const routes = express.Router();

routes.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  if (!password) return res.status(400).send({ message: 'O campo "password" é obrigatório' });

  const validEmail = validateEmail(email);
  const validPass = verifyPass(password);

  if (!validEmail) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!validPass) {
    return res.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }

  const token = generateToken();
  res.status(200).send({ token });
});

module.exports = routes;