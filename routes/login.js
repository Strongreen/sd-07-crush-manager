const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const emailValidator = require('email-validator');

const app = express();

app.use(bodyParser.json());

const tokenGenerator = () => crypto.randomBytes(8).toString('hex');
const passwordValidator = (password) => password.length >= 6;

app.post('/', (req, res) => {
  const { email, password } = req.body;
  const validEmail = emailValidator.validate(email);
  const validPassword = passwordValidator(password);

  if (!email) {
    res.status(400).send({ message: 'O campo "email" é obrigatório' });
  } else if (!validEmail) {
    res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  } else if (!password) {
    res.status(400).send({ message: 'O campo "password" é obrigatório' });
  } else if (!validPassword) {
    res.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  } else {
    const token = tokenGenerator();
    res.status(200).send({ token });
  }
});

module.exports = app;
