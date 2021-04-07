const express = require('express');
const fs = require('fs');
const CryptoJS = require('crypto-js');
const data = require('../crush.json');

const app = express();
const sucess = 200;
const notFound = 404;
const mandatory = 400;

const validatePass = (pass) => {
  if (pass !== undefined) {
    if (pass.length >= 6) {
      return true;
    }
    return {
      message: 'A "senha" deve ter pelo menos 6 caracteres',
    };
  }
  return { message: 'O campo "password" é obrigatório' };
};

const validateData = (email, pass) => {
  if (email !== undefined) {
    if (email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i)) {
      return validatePass(pass);
    }
    return {
      message: 'O "email" deve ter o formato "email@email.com"',
    };
  }
  return { message: 'O campo "email" é obrigatório' };
};

const encrypt = (object) => {
  const newEncript = CryptoJS.AES.encrypt(JSON.stringify(object), 'result')
    .toString()
    .slice(0, 16);
  return newEncript;
};

app.get('/', (_request, response) => {
  response.status(sucess).send();
});

app.get('/crush', (_req, res) => {
  const dataCrush = JSON.parse(
    fs.readFileSync(`${__dirname}/../crush.json`, 'utf-8'),
  );
  if (dataCrush.length > 0) {
    return res.status(sucess).send(dataCrush);
  }
  return res.status(sucess).send([]);
});

app.get('/crush/:id', (req, res) => {
  const { id } = req.params;
  const newData = data.filter((acc) => acc.id === parseInt(id, 2));
  try {
    if (newData.length > 0) {
      return res.status(sucess).send(newData[0]);
    }
    return res.status(notFound).send({ message: 'Crush não encontrado' });
  } catch (error) {
    throw new Error(error);
  }
});

app.get('/crush/search?q=searchTerm', (req, res) => {
  res.status(sucess).send();
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  if (validateData(email, password) === true) {
    return res.status(sucess).send({ token: encrypt(password) });
  }
  return res.status(mandatory).send(validateData(email, password));
});

app.post('/crush', (req, res) => {
  res.status(sucess).send();
});

// app.put('/crush/:id', (req, res) => {
//   res.status(sucess).send();
// });

app.delete('/crush/:id', (req, res) => {
  res.status(sucess).send();
});

module.exports = app;
