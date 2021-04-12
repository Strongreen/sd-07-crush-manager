const express = require('express');
const { tokenGenerator, validation } = require('../middlewares');

const { emailValidation } = validation;

const passwordTooShort = 'O "password" deve ter pelo menos 6 caracteres';

const router = express.Router();
const SUCCESS = 200;
const BAD_REQUEST = 400;

router.post('/', async (req, res) => {
  const { body } = req;
  const emailIsValid = emailValidation(body.email);

  if (!body.email) {
    return res.status(BAD_REQUEST).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailIsValid) {
    return res.status(BAD_REQUEST).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  if (!body.password) {
    return res.status(BAD_REQUEST).json({ message: 'O campo "password" é obrigatório' });
  }
  if (body.password.length < 6) {
    return res.status(BAD_REQUEST).json({ message: passwordTooShort });
  }
  return res.status(SUCCESS).json({ token: tokenGenerator() });
});

module.exports = router;
