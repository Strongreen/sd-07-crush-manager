const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

function createToken() {
  const token = crypto.randomBytes(8).toString('hex');
    return token;
}

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (req, res) => {
  const crushs = JSON.parse(await fs.promises.readFile('./crush.json', 'utf8'));
  return res.status(SUCCESS).send(crushs);
});

app.get('/crush/:id', async (req, res) => {
  const { id: reqId } = req.params;
  const crushs = JSON.parse(await fs.promises.readFile('./crush.json', 'utf8'));
  const crush = crushs.find(({ id }) => id.toString() === reqId);
  if (crush) {
    return res.status(SUCCESS).send(crush);
  }
  return res.status(404).send({
    message: 'Crush não encontrado',
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  // Regex do exercicio 1 (26.5) não funcionou
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  return res.status(SUCCESS).json({ token: createToken() });
});

app.listen(PORT, () => {
  console.log('Online');
});
