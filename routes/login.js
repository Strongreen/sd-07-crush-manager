const express = require('express');
const crypto = require('crypto');
const { BAD_REQUEST, SUCCESS } = require('../statusCode.json');

const router = express.Router();
router.use(express.json());

const validateEmail = (request, response, next) => {
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.([a-z]{3})+(\.[a-z]{2})?$/i;
  const { email } = request.body;

  if (!email) {
    return response
      .status(BAD_REQUEST)
      .json({ message: 'O campo "email" é obrigatório' });
  }

  if (!regex.test(email)) {
    return response
      .status(BAD_REQUEST)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }

  next();
};

const validatePassword = (request, response, next) => {
  const { password } = request.body;

  if (!password) {
    return response
      .status(BAD_REQUEST)
      .json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return response
      .status(BAD_REQUEST)
      .json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
    }

  next();
};

router.use(validateEmail);
router.use(validatePassword);

router.post('/', (_request, response) => {
  const token = crypto.randomBytes(8).toString('hex');

  response.status(SUCCESS).json({ token });
});

module.exports = router;
