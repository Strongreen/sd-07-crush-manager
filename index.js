const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const fs = require('fs');

app.use(bodyParser.json());

const SUCCESS = 200;
const FAIL = 404;
const LOGINFAIL = 400;
const PORT = '3000';

async function readFile() {
  const crushs = await JSON.parse(fs.readFileSync('crush.json', 'utf-8'));
  return crushs;
}

// Referência: https://stackoverflow.com/questions/8532406/create-a-random-token-in-javascript-based-on-user-details
function generateToken(length) {
  const a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
  const b = [];
  for (let i = 0; i < length; i += 1) {
    const j = (Math.random() * (a.length - 1)).toFixed(0);
    b[i] = a[j];
  }
  return b.join('');
}

function validateEmail(email) {
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
  return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
  if (password === undefined) return false;
  const convertPassword = password.toString();
  if (convertPassword.length >= 6 && convertPassword) {
    return true;
  }
  return false;
}

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (_req, res) => {
  const data = await readFile();
  res.status(SUCCESS).send(data);
});

app.get('/crush/:id', async (req, res) => {
  const { id } = req.params;
  const crushs = await readFile();
  const dataById = crushs.find((crush) => crush.id === Number(id));
  if (dataById) {
    return res.status(SUCCESS).send(dataById);
  }
  return res.status(FAIL).send({ message: 'Crush não encontrado' });
});

const login = async (req, res, next) => {
  const { password, email } = req.body;
  const isValidEmail = validateEmail(email);
  const isValidPassword = validatePassword(password);
  const tokenLength = 16;
  if (!email) {
    res.status(LOGINFAIL).json({ message: 'O campo "email" é obrigatório' });
  } else if (!isValidEmail) {
    res.status(LOGINFAIL).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  } else if (!password) {
    res.status(LOGINFAIL).json({ message: 'O campo "password" é obrigatório' });
  } else if (!isValidPassword) {
    res.status(LOGINFAIL).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  } else {
    res.status(SUCCESS).json({ token: `${generateToken(tokenLength)}` });
  }
  next();
};

app.post('/login', login);

app.listen(PORT, () => { console.log('Online'); });
