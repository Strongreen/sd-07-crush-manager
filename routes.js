const express = require('express');
const crypto = require('crypto');

const routes = express.Router();

const generateToken = () => crypto.randomBytes(8).toString('hex');

const validationEmail = (email) => {
  const emailPattern = /[\w.-]+@[\w-]+\.[\w-.]+/gi;
  return emailPattern.test(email);
};

const validationPass = (password) => password.length >= 6;

const checkEmail = (email) => {
  if (!email || email.length === 0) {
    return { message: 'O campo "email" é obrigatório' };
  }
  if (!validationEmail(email)) {
    return { message: 'O "email" deve ter o formato "email@email.com"' };
  }
  return null;
};

routes.post('/login', (req, res) => {
  const { email, password } = req.body;

  const emailErrorMessage = checkEmail(email);
  if (emailErrorMessage) return res.status(400).send(emailErrorMessage);

  if (!password || password.length === 0) {
    res.status(400).send({ message: 'O campo "password" é obrigatório' });
  }
  if (!validationPass(password)) {
    res.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  // if (validationEmail(email) && validationPass(password)) {
  //   res.status(200).send({ token: generateToken() });
  // }
  res.status(200).send({ token: generateToken() });
});

module.exports = routes;
