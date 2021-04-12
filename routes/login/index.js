const express = require('express');

const Login = express.Router();

const OK = 200;
const FAIL = 404;
const token = '7mqaVRXJSp886CGr';

const validateEmail = (mail) => {
  const regMail = /\S+@\S+\.\S+/i;
  return regMail.test(mail);
};

const validatePassword = (password) => {
  const minLength = 6;
  const passwordString = password.toString();
  return passwordString.length < minLength;
};

const throwError = (check, message) => {
  if (check) {
    throw new Error(message);
  }
};

Login.post('/', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    throwError(!email, 'O campo "email" é obrigatório');
    throwError(!password, 'O campo "password" é obrigatório');
    throwError(!validateEmail(email), 'O "email" deve ter o formato "email@email.com"');
    throwError(!validatePassword(password), 'A "senha" deve ter pelo menos 6 caracteres');
    return res.status(OK).send({ token });
  } catch (error) {
    return next({ status: FAIL, resp: error.message });
  }
});

module.exports = Login;
