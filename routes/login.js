const express = require('express');
// const { loginMiddleware } = require('../middlewares');
const crypto = require('crypto');

const tokenGenerator = () => crypto.randomBytes(8).toString('hex');

const router = express.Router();

router.post('/', (req, res) => {
  const regexEmail = /^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/;

  console.log(req.body);

  if (req.body.length === 0) return res.status(400).send({
    message: 'O campo "email" é obrigatório'
  });
  
  if (!regexEmail.test(req.body.email)) return res.status(400).send({
    message: 'O "email" deve ter o formato "email@email.com"'
  });

  if (!req.body.password) return res.status(400).send({
    message: 'O campo "password" é obrigatório'
  });

  if (req.body.password.length < 6) return res.status(400).send({
    message: 'A "senha" deve ter pelo menos 6 caracteres'
  });

  const token = tokenGenerator();

  res.send({ token });
});

module.exports = router;
