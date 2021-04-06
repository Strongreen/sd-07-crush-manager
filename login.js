const routes = require('express').Router();

function tokens() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  const tamanho = 16;
  for (let index = 0; index < tamanho; index += 1) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}

const ERRO = 400;
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%+-]+\.com$/;

routes.post('/', (request, response) => {
  const { email, password } = request.body;

  if (!email) {
    response.status(ERRO).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!regexEmail.test(email)) {
    response.status(ERRO).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    response.status(ERRO).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    response.status(ERRO).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  const token = tokens();
  response.status(200).json({ token });
});

module.exports = routes;
