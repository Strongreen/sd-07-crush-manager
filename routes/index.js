const express = require('express');
const fs = require('fs');
const CryptoJS = require('crypto-js');
// const dataFile = require('../crush.json');
const validation = require('./validation');

const app = express();
const sucess = 200;
const notFound = 404;
const mandatory = 400;
const URL_ID = '/crush/:id';

const { validateFilds, validationToken } = validation;

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

app.get('/crush', (_req, res) => {
  const dataCrush = JSON.parse(fs.readFileSync(`${__dirname}/../crush.json`, 'utf-8'));
  return res.status(sucess).send(dataCrush); 
});

app.get(URL_ID, async (req, res) => {
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

app.post('/crush', async (req, res) => {
  const { authorization } = req.headers;
  const { name, age, date } = req.body;
  
  const isOk = validateFilds({ authorization, name, age, date });

  if (isOk) return res.status(isOk.status).send({ message: isOk.message });

  const dataCrushList = await crushFile();

  const newCrush = { id: JSON.parse(dataCrushList).length + 1, name, age, date };
 
  const newCrushList = [...dataCrushList, newCrush];
    
  await fs.promises.writeFile(`${__dirname}/../crush.json`, JSON.stringify(newCrushList));
  return res
    .status(201)
    .send(newCrush);
});

app.put(URL_ID, async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  const { name, age, date } = req.body;
  const isOk = validateFilds({ authorization, name, age, date });
  if (isOk) return res.status(isOk.status).send({ message: isOk.message });
  const dataCrushList = await crushFile();
  const list = JSON.parse(dataCrushList).filter((act) => act.id !== id);

  const userId = Number(id);
  const newCrush = { id: userId, name, age, date };
  console.log(newCrush);
  const newCrushList = [...list, newCrush];
    
  await fs.promises.writeFile(`${__dirname}/../crush.json`, JSON.stringify(newCrushList));
  return res
    .status(200)
    .send(newCrush);
});

app.delete(URL_ID, async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  const dataCrush = await crushFile();

  const isOk = validationToken(authorization);

  if (isOk) return res.status(401).send({ message: isOk });

  const newData = JSON.parse(dataCrush).filter((act) => act.id !== id);

  await fs.promises.writeFile(`${__dirname}/../crush.json`, JSON.stringify(newData));
  res.status(200).send({ message: 'Crush deletado com sucesso' });
});

module.exports = app;
