const express = require('express');
const fs = require('fs');
const CryptoJS = require('crypto-js');
const dataFile = require('../crush.json');
const validation = require('./validation');

const app = express();
const sucess = 200;
const notFound = 404;
const mandatory = 400;

const {
  validateName,
  validateDate,
  validateAge,
  validateRate,
  validationToken,
  validateDataObject,
 } = validation;

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

const crushFile = () => fs.promises.readFile(`${__dirname}/../crush.json`, 'utf-8');

const filterId = async (id) => {
  const selectCrush = await crushFile();
  return JSON.parse(selectCrush).find((acc) => Number(acc.id) === Number(id));
}; 

app.get('/', (_request, response) => {
  response.status(sucess).send();
});

app.get('/crush', async (_req, res) => {
  const dataCrush = await crushFile();
  return res.status(sucess).send(dataCrush); 
});

app.get('/crush/:id', async (req, res) => {
  const { id } = req.params;
  const data = await filterId(id);

  if (!data) return res.status(notFound).send({ message: 'Crush não encontrado' });
  
  return res.status(sucess).send(data);
});

app.get('/crush/search?q=searchTerm', (req, res) => {
  res.status(sucess).send();
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (validateData(email, password) === true) {
    return res.status(sucess).send({ token: encrypt(password) });
  }
  return res.status(mandatory).send(validateData(email, password));
});

// Gambiarra temporaria 
const id = 5;

app.post('/crush', async (req, res) => {
  const { name, age, date } = req.body;
  const { headers } = req;
  const { authorization } = headers;
  
    const newCrush = { id, name, age, date };

  const newCrushList = [dataFile, newCrush];
  validationToken(headers, authorization, 'authorization', res);
  validateDataObject(date, res);
  validateRate(date.rate, res);
  validateDate(date.datedAt, res);
  validateName(name, res);
  validateAge(age, res);
    
  await fs.promises.writeFile(`${__dirname}/../crush.json`, JSON.stringify(newCrushList));
  return res
    .status(201)
    .send(newCrush);
});

// app.put('/crush/:id', (req, res) => {
//   res.status(sucess).send();
// });

app.delete('/crush/:id', (req, res) => {
  res.status(sucess).send();
});

module.exports = app;
