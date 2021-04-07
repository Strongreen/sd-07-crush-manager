const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const crushJson = './crush.json';
const crushFile = () => fs.promises.readFile(crushJson, 'utf8');
// desse jeito porque vai ser chamado várias outras vezes (Plantão Rufino);

app.get('/', async (_req, res) => res.status(200).json(JSON.parse(await crushFile()))); // requisito 1

async function findAsyncId(id) {
  const content = await crushFile();
  return JSON.parse(content).find((item) => Number(item.id) === Number(id));
}

app.get('/:id', async (req, res) => {
  const { id } = req.params;
  const isId = await findAsyncId(id);
  if (!isId) return res.status(404).send({ message: 'Crush não encontrado' });
  
  return res.status(200).send(isId);
}); // requisito 2

function isValidName(name) {
  if (!name) return 'O campo "name" é obrigatório';
  if (name.length < 3) return 'O "name" deve ter pelo menos 3 caracteres';
}

function isValidAge(age) {
  let response;

  if (!age) {
    response = 'O campo "age" é obrigatório';
  } else if (age < 18) {
    response = 'O crush deve ser maior de idade';
  }

  return response;
}

const patternResponse = 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';

function isValidDatedAt(datedAt) {
  const regex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

  if (!datedAt) {
    return patternResponse;
  }
  if (!datedAt.match(regex)) {
    return 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"';
  }
} // referência: Vitor Rodrigues

function isValidRate(rate) {
  if (rate < 1 || rate > 5) return 'O campo "rate" deve ser um inteiro de 1 à 5';
  if (!rate) return patternResponse;
} // referência: Vitor Rodrigues

function isValidDate(date) {
  let response;
  if (!date) {
    response = patternResponse;
  } else {
    response = isValidRate(date.rate) || isValidDatedAt(date.datedAt);
  }

  return response;
} // referência: Vitor Rodrigues

function isValidAuthorization(auth) {
  let response;
  
  if (!auth) {
    response = 'Token não encontrado';
  } else if (auth.length !== 16) {
    response = 'Token inválido';
  }

  return response;
}

function completeAuth(objParams) {
  const { authorization, res, name, age, date } = objParams;
  const isAuth = isValidAuthorization(authorization);
  if (isAuth) return res.status(401).send({ message: isAuth });
  const isName = isValidName(name);
  if (isName) return res.status(400).send({ message: isName });
  const isAge = isValidAge(age);
  if (isAge) return res.status(400).json({ message: isAge });
  const isDate = isValidDate(date);
  if (isDate) return res.status(400).send({ message: isDate });
}

app.post('/', async (req, res) => {
  const { authorization } = req.headers;
  const isAuth = isValidAuthorization(authorization);
  if (isAuth) return res.status(401).send({ message: isAuth });

  const { name, age, date } = req.body;
  const params = { authorization, res, name, age, date };
  completeAuth(params);
  
  const crushes = await crushFile();
  const newCrush = { id: JSON.parse(crushes).length + 1, name, age, date };
  const addCrush = [...crushes, newCrush];
  await fs.promises.writeFile(crushJson, JSON.stringify(addCrush));
  return res.status(201).json(newCrush);
});

app.put('/:id', async (req, res) => {
  const { authorization } = req.headers;
  const { name, age, date } = req.body;
  const params = { authorization, res, name, age, date };
  completeAuth(params);
  const { id } = req.params;
  const thisCrush = await findAsyncId(id);
  if (thisCrush) {
    thisCrush.name = name;
    thisCrush.age = age;
    thisCrush.date = date;
    return res.status(200).json(thisCrush);
  }
});

app.delete('/:id', async (req, res) => {
  const { authorization } = req.headers;
  const isAuth = isValidAuthorization(authorization);
  if (isAuth) return res.status(401).send({ message: isAuth });

  const { id } = req.params;
  const crushes = await crushFile();
  const newArrayCrushes = JSON.parse(crushes).filter((item) => Number(item.id) !== Number(id));

  await fs.promises.writeFile(crushJson, JSON.stringify(newArrayCrushes));
  return res.status(200).json({ message: 'Crush deletado com sucesso' });
});

module.exports = app;
