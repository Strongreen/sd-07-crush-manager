const express = require('express');
const randomToken = require('random-token');

const app = express();

const emailEvaluator = (email) => {
  const regexEmail = new RegExp('.+@[A-z]+[.]com');

  if (email === undefined || email.length === 0) {
    return 'O campo "email" é obrigatório';
  }

  if (!regexEmail.test(email)) {
    return 'O "email" deve ter o formato "email@email.com"';
  }

  return false;
};

const passwordEvaluator = (password) => {
  const regexPassword = new RegExp('.{6}');

  if (!password || password.length === 0) {
    return 'O campo "password" é obrigatório';
  }

  if (!regexPassword.test(password)) {
    return 'O "password" deve ter pelo menos 6 caracteres';
  }

  return false;
};

app.post('/', (req, res) => {
  const { email, password } = req.body;
  const responseEmail = emailEvaluator(email);
  const responsePassword = passwordEvaluator(password);
  const token = randomToken(16);

  if (responseEmail !== false) {
    res.status(400).send({ message: responseEmail });
  }
  if (responsePassword !== false) {
    res.status(400).send({ message: responsePassword });
  }

  res.send({ token });
});

module.exports = app;
