const express = require('express');
const randtoken = require('rand-token');

const router = express.Router();
// const fsMethods = require('./services/fslol');
// const ppid = require("./services/token");

let tokens = [];

const validateRequest = (email, password) => {
  const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email) {
    return { message: 'O campo "email" é obrigatório' };
  }
  if (!regexEmail.test(email)) {
    return { message: 'O "email" deve ter o formato "email@email.com"' };
  }
  if (!password) {
    return { message: 'O campo "password" é obrigatório' };
  }
  if (password.toString().length < 6) {
    return {
      message: 'A "senha" deve ter pelo menos 6 caracteres',
    };
  }

  return true;
};

router.post('/', (req, res) => {
  const { email, password } = req.body;
  const isValid = validateRequest(email, password);

  if (isValid !== true) {
    return res.status(400).json(isValid);
  }

  const token = randtoken.generate(16);
  tokens = [...tokens, token];
  res.json({ token });
});

module.exports = router;
