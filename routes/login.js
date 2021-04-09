const express = require('express');
const crypto = require('crypto');

const app = express();

const validateEmail = (email) => {
  const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  const result = regex.test(email);
  
  if (!email) {
    throw new Error('O campo "email" é obrigatório');
  }
  if (!result) {
    throw new Error('O "email" deve ter o formato "email@email.com"');
  }
};

const validatePass = (password) => {
  if (password === undefined || password === null) {
    throw new Error('O campo "password" é obrigatório');
  }
  if (password.toString().length < 6) {
    throw new Error('A "senha" deve ter pelo menos 6 caracteres');
  }
};

app.post('/', (req, res) => {
  const { email, password } = req.body;

  try {
    validateEmail(email);
    validatePass(password);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
  const token = crypto.randomBytes(8).toString('hex');
  res.status(200).send({ token });
});

module.exports = app;