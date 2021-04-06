const express = require('express');
const randomToken = require('random-token');

const app = express();

const emailEvaluator = (email) => {
  const regexEmail = new RegExp('.+@[A-z]+[.]com');

  if (email === undefined || email.length === 0) {
    throw new Error('O campo "email" é obrigatório');
  } else if (!regexEmail.test(email)) {
    throw new Error('O "email" deve ter o formato "email@email.com"');
  }
};

const passwordEvaluator = (password) => {
  const regexPassword = new RegExp('.{6}');

  if (!password || password.length === 0) {
    throw new Error('O campo "password" é obrigatório');
  } else if (!regexPassword.test(password)) {
    throw new Error('A "senha" deve ter pelo menos 6 caracteres');
  }
};

app.post('/', (req, res) => {
  const { email, password } = req.body;

  try {
    emailEvaluator(email);
    passwordEvaluator(password);

    const token = randomToken(16);
    res.send({ token });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = app;
