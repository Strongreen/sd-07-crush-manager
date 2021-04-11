const routes = require('express').Router();
const { generateToken } = require('../services/functions');

// Objeto de erros inspirado na solução do estudante Carlos Souza
// https://github.com/tryber/sd-07-crush-manager/pull/54/files#diff-b2c56e2ce626c79f9e86e44e0dc26e6eea4c9f689fd0b7167a97de7d4e7d22bf
const error = {
  emailMissing: 'O campo "email" é obrigatório',
  emailInvalid: 'O "email" deve ter o formato "email@email.com"',
  passwordMissing: 'O campo "password" é obrigatório',
  passwordInvalid: 'A "senha" deve ter pelo menos 6 caracteres',
};

routes.post('/', async (req, res) => {
  const { email, password } = req.body;

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (!email) return res.status(400).send({ message: error.emailMissing });
  if (!emailRegex.test(email)) return res.status(400).send({ message: error.emailInvalid });
  if (!password) return res.status(400).send({ message: error.passwordMissing });
  if (password.length < 6) return res.status(400).send({ message: error.passwordInvalid });
  
  const token = generateToken();
  res.status(200).send({ token });
});

module.exports = routes;
