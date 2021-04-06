const routes = require('express').Router();

const erro = 400;
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+.com$/;
function tokenGenereitor() {
  const characters = 'ABCDFGHIJKLMNOPQRSTUVWXYZabcdefgyijklmnopqrstuvwxyz0123456789';
  const length = 16;
  let token = '';
  for (let index = 0; index < length; index += 1) {
    token += characters.charAt(Math.floor(Math.random() * characters.length)); 
  }
  return token;
}

routes.post('/', (request, response) => {
  const { email, password } = request.body;
  
  if (!email) {
    response.status(erro).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!regexEmail.test(email)) {
    response.status(erro).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    response.status(erro).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    response.status(erro).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  const token = tokenGenereitor();
  return response.status(200).json({ token });
});

module.exports = routes;