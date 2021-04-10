const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

const SUCCESS = 200;
const BAD_REQUEST = 400;
// const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

const getData = () => JSON.parse(fs.readFileSync('./crush.json', 'utf8'));
const token = { token: '7mqaVRXJSp886CGr' };

app.get('/crush', (_req, res) => {
    res.status(SUCCESS).json(getData());
});

app.get('/crush/:id', (req, res) => {
  const { id: reqId } = req.params;
  const crushes = getData();
  const message = { message: 'Crush não encontrado' };
  const result = crushes.find(({ id: crushId }) => crushId === Number(reqId));
  if (result) {
    return res.status(SUCCESS).json(result);
  }
  return res.status(NOT_FOUND).json(message);
});

function verifyEmail(email) {
  // const emailRegex = /^([a-zA-Z0-9_-]+)@mail\.com$/gm;
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
  return emailRegex.test(email);
}

function verifyPassword(password) {
  const passwordRegex = /^\d{6}$/gm;
  return passwordRegex.test(password);
}

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const emailIsValid = verifyEmail(email);
  const passwordIsValid = verifyPassword(password);
  
  if (!email) {
    return res.status(BAD_REQUEST).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailIsValid) {
    res.status(NOT_FOUND).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    res.status(BAD_REQUEST).json({ message: 'O campo "password" é obrigatório' });
  }
  if (!passwordIsValid) {
    res.status(NOT_FOUND).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  res.status(SUCCESS).json(token);
});

app.listen(PORT, () => {
  console.log(`App rodando na porta ${PORT}`);
});
