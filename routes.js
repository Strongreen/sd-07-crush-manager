const express = require('express');
const crypto = require('crypto');

const routes = express.Router();

const generateToken = () => crypto.randomBytes(8).toString('hex');

const validationEmail = (email) => {
  const emailPattern = /[\w.-]+@[\w-]+\.[\w-.]+/gi;
  return emailPattern.test(email);
};

const validationPass = (password) => password.length >= 6;

routes.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || email.length === 0) {
    res.status(400).send({ message: 'O campo "email" é obrigatório' });
  }
  if (!validationEmail(email)) {
    res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password || password.length === 0) {
    res.status(400).send({ message: 'O campo "password" é obrigatório' });
  }
  if (!validationPass(password)) {
    res.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  if (validationEmail(email) && validationPass(password)) {
    res.status(200).send({ token: generateToken() });
  }
});

module.exports = routes;
