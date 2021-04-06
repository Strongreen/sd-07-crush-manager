const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
// const path = require('path');

const fs = require('fs');

const crushFile = './crush.json';
const validatorEmail = /^\S+@\S+\.\S+$/;
// const validatorDate = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/;

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
// const CREATED = 201;
const NOTFOUND = 404;
const ERROR = 400;
// const UNAUTHORIZED = 401;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

const readFile = (file) => {
  const response = JSON.parse(fs.readFileSync(file), 'utf-8');
  return response;
};

// const writeInFile = async (content) => (
//   fs.writeFile(
//     path.resolve(__dirname, '.', 'crush.json'),
//     JSON.stringify(content),
//     (err) => {
//       if (err) throw err;
//     },
//   )
// );

app.get('/crush', (_req, res) => {
  const crushs = readFile(crushFile);
  return res.status(SUCCESS).send(crushs);
});

app.get('/crush/:id', (req, res) => {
  const crushs = readFile(crushFile);
  const { id } = req.params;
  const crushId = crushs.find((c) => c.id === parseInt(id, 10));
  if (crushId) {
    return res.status(SUCCESS).send(crushId);
  }
  return res.status(NOTFOUND).send({
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
    return res.status(ERROR).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  } if (!validatorEmail.test(email)) {
    return res.status(ERROR).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(SUCCESS).send({ token });
});

// app.post('/crush', async (req, res) => {
//   const { authorization } = req.headers;

//   if (!authorization) {
//     return res.status(UNAUTHORIZED).send({ message: 'Token não encontrado' });
//   } if (authorization.length < 16) {
//     return res.status(UNAUTHORIZED).send({ message: 'Token inválido' });
//   }

//   if (req.body.date === undefined || Object.keys(req.body.date).length === 0) {
//     return res.status(ERROR).send({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
//   }

//   const { name, age, date } = req.body;
//   const { datedAt, rate } = date;  

//   if (!name) {
//     return res.status(ERROR).send({ message: 'O campo "name" é obrigatório' });
//   } if (name.length < 3) {
//     return res.status(ERROR).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
//   } if (!age) {
//     return res.status(ERROR).send({ message: 'O campo "age" é obrigatório' });
//   } if (age < 18) {
//     return res.status(ERROR).send({ message: 'O crush deve ser maior de idade' });
//   } if (!datedAt || !rate) {
//     return res.status(ERROR).send({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
//   } if (!validatorDate.test(datedAt)) {
//     return res.status(ERROR).send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
//   } if (rate < 1 || rate > 5) {
//     return res.status(ERROR).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
//   }

//   const oldCrushs = readFile(crushFile);
//   const id = oldCrushs.length + 1;
//   const newArrayOfCrushs = [...oldCrushs, { id, name, age, date }];
//   await writeInFile(newArrayOfCrushs);
//   return res.status(CREATED).send({ id, name, age, date });
// });

app.listen(PORT, () => { console.log('Online'); });
