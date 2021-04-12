const express = require('express');
const crypto = require('crypto');
const emailValidator = require('email-validator');

const app = express();

app.use(express.json());

const tokenGenerator = () => crypto.randomBytes(8).toString('hex');
const passwordValidator = (password) => password.length >= 6;
const emptyOrUdefined = (value) => {
  if (value === undefined || value === '') return true;
  return false;
};
app.post('/', (req, res, next) => {
  const { email, password } = req.body;

  if (emptyOrUdefined(email)) {
    res.status(400).send({ message: 'O campo "email" é obrigatório' });
  } else if (emptyOrUdefined(password)) {
    res.status(400).send({ message: 'O campo "password" é obrigatório' });
  }

  const validEmail = emailValidator.validate(email);
  const validPassword = passwordValidator(password);
  if (!validEmail) {
    res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  } else if (!validPassword) {
    res.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  res.status(200).send({ token: tokenGenerator() });

  next();
});

module.exports = app;
