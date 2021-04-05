const express = require('express');

const app = express();
const SUCCESS = 200;
const FAIL = 400;

function makeToken() {
  const tokenLength = 16;
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < tokenLength; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return { token: result };
}
// criação do token consultada em: https://qastack.com.br/programming/1349404/generate-random-string-characters-in-javascript

function validarEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}
// vaidação de email consultada em: https://www.horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex/

app.use(express.json());

app.post('/', (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(FAIL).send({ message: 'O campo "email" é obrigatório' });
  }
  if (!validarEmail(email)) {
    return res.status(FAIL).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(FAIL).send({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(FAIL).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  return res.status(SUCCESS).send(makeToken());
});

module.exports = app;
