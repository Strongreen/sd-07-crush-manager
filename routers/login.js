const express = require('express');
const crypto = require('crypto');

const router = express.Router();
const SUCCESS = 200;
const INVALIDDATA = 400;

const checkedEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

const checkedEmailMidlleware = (req, res, next) => {
  const { email } = req.body;
  if (!email || email === '') {
    return res.status(INVALIDDATA).send({ message: 'O campo "email" é obrigatório' });
  }
  if (!checkedEmail(email)) {
    return res.status(INVALIDDATA)
    .send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const checkedPasswordMidlleware = (req, res, next) => {
  const { password } = req.body;
  if (!password || password === '') { 
    return res.status(INVALIDDATA).send({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(INVALIDDATA)
    .send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

router.post('/', checkedEmailMidlleware, checkedPasswordMidlleware, (req, res) => {
  const token = crypto.randomBytes(16).toString('hex');
  return res.status(SUCCESS).send({ token });
});

module.exports = router;