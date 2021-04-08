const express = require('express');
const crypto = require('crypto');

const Login = express.Router();

const SUCCESS = 200;
const NAO_EXISTE = 400;

const generateToken = () => crypto.randomBytes(8).toString('hex');

const validateEmail = (email) => {
  const regexEmail = /\S+@\S+\.\S+/i;
  return regexEmail.test(email);
};

const validatePassword = (password) => {
  const minLength = 6;
  const passwordString = password.toString();
  return passwordString.length < minLength;
};

const throwError = (error, message) => {
  if (error) {
    throw new Error(message);
  }
};

Login.post('/', (request, response, next) => {
  try {
    const { email, password } = request.body;
    const token = generateToken();
    throwError(!email, 'O campo "email" é obrigatório');
    throwError(!validateEmail(email), 'O "email" deve ter o formato "email@email.com"');
    throwError(!password, 'O campo "password" é obrigatório');
    throwError(validatePassword(password), 'A "senha" deve ter pelo menos 6 caracteres');
    return response.status(SUCCESS).send({ token });
  } catch (error) {
    console.log(error);
    return next({
      status: NAO_EXISTE,
      message: error.message,
    });
  }
});

module.exports = Login;
