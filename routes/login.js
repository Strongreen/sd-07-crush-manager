const express = require('express');

const app = express();
const crypto = require('crypto');

function validationEmail(email) {
  const emailval = /\S+@\S+\.\S+/;
  return emailval.test(email);
}

function validationPassword(password) {
  return password.toString().length < 6;
}

app.post('/', (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  if (!password) return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  if (validationPassword(password)) {
 return res.status(400).send({
       message: 'A "senha" deve ter pelo menos 6 caracteres' }); 
}
  if (!validationEmail(email)) {
 return res.status(400).send({ 
      message: 'O "email" deve ter o formato "email@email.com"' }); 
}

  const token = crypto.randomBytes(8).toString('hex');
  return res.status(200).send({ token });
});

module.exports = app;