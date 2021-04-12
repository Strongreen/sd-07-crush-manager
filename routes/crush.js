const express = require('express');
const utils = require('../utils/utils');

const app = express();
const SUCCESS = 200;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const emailRequired = { message: 'O campo "email" é obrigatório' };
const emailInvalid = { message: 'O "email" deve ter o formato "email@email.com"' };
const passwordRequired = { message: 'O campo "password" é obrigatório' };
const passwordInvalid = { message: 'A "senha" deve ter pelo menos 6 caracteres' };

app.get('/', async (_request, response) => {
  response.status(SUCCESS).send(await utils.getCrushs());
});

app.get('/:id', async (request, response) => {
  const { id } = request.params;  
  const crush = await utils.getCrushById(id);
  
  if (crush) return response.status(SUCCESS).send(crush); 

  return response.status(NOT_FOUND).send({
    message: 'Crush não encontrado',
  });
});

app.post('/', async (request, response) => {
  const { email } = request.body;
  const { password } = request.body;
  const res = response.status(BAD_REQUEST);

  if (!email) return res.send(emailRequired);
  if (!utils.validateEmail(email)) return res.send(emailInvalid);
  if (!password) return res.send(passwordRequired);
  if (!utils.validatePassword(password)) return res.send(passwordInvalid);
  const token = await utils.generateToken();
  response.send({
    token: `${token}`,
  });
});

module.exports = app;