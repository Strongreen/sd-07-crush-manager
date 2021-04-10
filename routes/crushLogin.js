const express = require('express');
const crypto = require('crypto');

const app = express();
const generateToken = () => crypto.randomBytes(8).toString('hex');

function verifyEmail(email) {
  // https://cursos.alura.com.br/forum/topico-como-validar-email-e-senha-em-javascript-80469
  const emailRegex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  return emailRegex.test(email);
}

app.post('/', (req, res) => {
  const { email, password } = req.body;
  
  const token = generateToken();

  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!verifyEmail(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  res.status(200).json({ token });
});

module.exports = app;
