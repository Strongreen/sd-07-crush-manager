const express = require('express');
const rescue = require('express-rescue');

const { ErrorHandler } = require('../helpers/error');

const router = express.Router();

const { generateToken } = require('../helpers/util');

const validateEmail = (email) => {
  const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
  if (!email) {
    throw new ErrorHandler(400, 'O campo "email" é obrigatório');
  }
  if (!regexEmail.test(email)) {
    throw new ErrorHandler(400, 'O "email" deve ter o formato "email@email.com"');
  }
};

const validatePassword = (password) => {
  if (!password) {
    throw new ErrorHandler(400, 'O campo "password" é obrigatório');
  }
  if (password.length < 6) {
    throw new ErrorHandler(400, 'O "password" deve ter pelo menos 6 caracteres');
  }
};

router.post('/', rescue((req, res) => {
  const { email, password } = req.body;
  const TOKEN_LENGHT = 8;

  validateEmail(email);
  validatePassword(password);

  res.send({ token: generateToken(TOKEN_LENGHT) });
}));

module.exports = router;
