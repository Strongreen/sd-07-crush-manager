const express = require('express');
// https://www.npmjs.com/package/rand-token
const randToken = require('rand-token');
// https://www.npmjs.com/package/email-regex
const emailRegex = require('email-regex');
// https://www.npmjs.com/package/password-validator?activeTab=readme
const PasswordValidator = require('password-validator');

const schema = new PasswordValidator();
schema.is().min(6);

const app = express();

const emailValidation = (email) => {
  const validEmail = emailRegex({ exact: true }).test(email);

  if (!email) {
    throw new Error('O campo "email" é obrigatório');
  }

  if (!validEmail) {
    throw new Error('O "email" deve ter o formato "email@email.com"');
  }
};

const passwordValidation = (password) => {
  const validPassword = schema.validate(password);

  if (!password) {
    throw new Error('O campo "password" é obrigatório');
  }

  if (!validPassword) {
    throw new Error('A "senha" deve ter pelo menos 6 caracteres');
  }
};

app.post('/', (req, res) => {
  const { email, password } = req.body;
  try {
    const token = randToken.generate(16);

    emailValidation(email);
    passwordValidation(password);

    return res.status(200).send({
      token: `${token}`,
  });
  } catch (error) {
    return res.status(400).send({
      message: error.message,
    });
  }
});

module.exports = app;
