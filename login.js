const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

function isValidEmail(email) {
  let response = '';
  let responseBool = false;

  if (!email) {
    response = 'O campo email é obrigatório';
    responseBool = true;
  } else if (!email.includes('@') && !email.includes('.com')) {
    response = 'O email deve ter o formato email@email.com';
    responseBool = true;
  } else {
    responseBool = false;
  }

  return [responseBool, response];
}

function isValidPassword(password) {
  let response = '';
  let responseBool = false;

  if (!password) {
    response = 'O campo "password" é obrigatório';
    responseBool = true;
  } else if (password.length < 6) {
    response = 'A "senha" ter pelo menos 6 caracteres';
    responseBool = true;
  } else {
    responseBool = false;
  }

  return [responseBool, response];
}

app.post('/', (req, res) => {
  const isEmail = isValidEmail(req.body.email);
  const isPassword = isValidPassword(req.body.password);

  if (isEmail[0]) {
    res.status(400).send({ message: isEmail[1] });
  } else if (isPassword[0]) {
    res.status(400).send({ message: isPassword[1] });
  } else {
    res.status(200).send({ token: crypto.randomBytes(8).toString('hex') });
    // referência: gabarito dia 26.4, exercício 3 do bônus
  }
});

app.use((err, _req, res, _next) => {
  res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`);
});

module.exports = app;
