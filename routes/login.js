const express = require('express');
const { checkPassword, checkEmail, throwError } = require('./util');

const router = express.Router();

const SUCCESS = 200;
const BAD_REQUEST = 400;
const token = '7mqaVRXJSp886CGr';

router.post('/', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    throwError(!email, 'O campo "email" é obrigatório');
    throwError(!password, 'O campo "password" é obrigatório');
    throwError(!checkEmail(email), 'O "email" deve ter o formato "email@email.com"');
    throwError(!checkPassword(password), 'A "senha" deve ter pelo menos 6 caracteres');
    return res.status(SUCCESS).send({ token });
  } catch (error) {
    return next({ status: BAD_REQUEST, resp: error.message });
  }  
});

module.exports = router;