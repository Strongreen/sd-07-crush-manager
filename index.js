const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const fs = require('fs');

const crushFile = './crush.json';
const validatorEmail = /^\S+@\S+\.\S+$/;

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const NOTFOUND = 404;
const ERROR = 400;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

const readFile = (file) => {
  const response = JSON.parse(fs.readFileSync(file), 'utf-8');
  return response;
};

app.get('/crush', (_req, res) => {  
  const crushs = readFile(crushFile);
  res.status(SUCCESS).send(crushs);
});

app.get('/crush/:id', (req, res) => {
  const crushs = readFile(crushFile);
  const { id } = req.params;
  const crushId = crushs.find((c) => c.id === parseInt(id, 10));
  if (crushId) {
    res.status(SUCCESS).send(crushId);
  }
  res.status(NOTFOUND).send({
    message: 'Crush não encontrado',
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email) {
    return res.status(ERROR).send({ message: 'O campo "email" é obrigatório' });
  } if (!password) {
    return res.status(ERROR).send({ message: 'O campo "password" é obrigatório' });
  } if (password.length < 6) {
    return res.status(ERROR).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  } if (!validatorEmail.test(email)) {
    return res.status(ERROR).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  } 
    const token = crypto.randomBytes(8).toString('hex');
    return res.status(SUCCESS).send({ token });
});

app.listen(PORT, () => { console.log('Online'); });
