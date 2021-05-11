const express = require('express');
const randomToken = require('random-token');

const app = express();

// Regex consultado no PR do colega Arthur Massaini: https://github.com/tryber/sd-07-crush-manager/blob/ca9f149b2787034e635aa1cf8aadf04ff3cae4dd/routes/login.js
const emailValidation = (email) => {
  const emailRegex = new RegExp('.+@[A-z]+[.]com');

  if (email === undefined || email.length === 0) {
    throw new Error('O campo "email" é obrigatório');
  } else if (!emailRegex.test(email)) {
    throw new Error('O "email" deve ter o formato "email@email.com"');
  }
};

const passwordValidation = (password) => {
  const passRegex = new RegExp('.{6}');

  if (!password || password.length === 0) {
    throw new Error('O campo "password" é obrigatório');
  } else if (!passRegex.test(password)) {
    throw new Error('A "senha" deve ter pelo menos 6 caracteres');
  }
};

app.post('/', (req, res) => {
  const { email, password } = req.body;

  try {
    emailValidation(email);
    passwordValidation(password);

    const token = randomToken(16);
    res.send({ token });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = app;
