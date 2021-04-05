const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

const readCrushFile = async () => {  
  try {
  const content = await fs.readFile(path.resolve(__dirname, '.', 'crush.json'));
  return JSON.parse(content.toString('utf-8'));
  } catch (error) {
    return error;
  } 
};


// requisito 1
app.get('/crush', async (req, res) => {
  const crushes = await readCrushFile();
  res.status(200).send(crushes);  
});

// requisito 2
app.get('/crush/:id', async (req, res) => {
  const crushes = await readCrushFile();
  const { id } = req.params;
  const filteredCrush = crushes.find((crush) => crush.id === Number(id));
  if (!filteredCrush) return res.status(404).send({ message: 'Crush não encontrado' });  
  res.status(200).send(filteredCrush);  
});

// requisito 3
const validateEmail = (email) => {
  const regexToValidateEmail = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;
  const emptyEmail = !email || email === '';
  if (emptyEmail) return { message: 'O campo "email" é obrigatório' };
  const validEmail = regexToValidateEmail.test(String(email).toLowerCase());  
  if (!validEmail) return { message: 'O "email" deve ter o formato "email@email.com"' };
};

const validatePassword = (password) => {
  const emptyPassword = !password || password.length === 0;
  if (emptyPassword) return { message: 'O campo "password" é obrigatório' };
  const validPassword = password.length >= 6;  
  if (!validPassword) return { message: 'O "password" deve ter pelo menos 6 caracteres' };
};

app.post('/login', (req, res, next) => {
const { email, password } = req.body;
const isEmailValid = validateEmail(email);
const isPasswordValid = validatePassword(password);
if (isEmailValid) return res.status(400).send(isEmailValid);
if (isPasswordValid) return res.status(400).send(isPasswordValid);

// source: https://www.w3schools.com/nodejs/ref_crypto.asp
const token = crypto.randomBytes(8).toString('hex');
req.body = { token };
res.status(200).send(req.body);
next();
});

app.listen(PORT, () => { console.log('Online'); });
