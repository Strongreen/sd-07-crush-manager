const routes = require('express').Router();
const crypto = require('crypto');

const SUCCESS = 200;
const NOT_FOUND = 400;
const regex = /\w+@+\w+.com/;
const EMAIL_EMPTY = 'O campo "email" é obrigatório';
const EMAIL_INVALID = 'O "email" deve ter o formato "email@email.com"';
const PASS_EMPTY = 'O campo "password" é obrigatório';
const PASS_INVALID = 'A "senha" deve ter pelo menos 6 caracteres';

routes.post('/', (request, response) => {
  const { email, password } = request.body;

  if (!email) return response.status(NOT_FOUND).json({ message: EMAIL_EMPTY });
  if (!regex.test(email)) return response.status(NOT_FOUND).json({ message: EMAIL_INVALID });

  if (!password) return response.status(NOT_FOUND).json({ message: PASS_EMPTY });
  if (password.length < 6) return response.status(NOT_FOUND).json({ message: PASS_INVALID });

  const token = crypto.createHash('md5').update(email + password).digest('hex').slice(0, 16);
  return response.status(SUCCESS).json({ token });
});

module.exports = routes;