const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const crushJson = './crush.json';
const crushFile = () => fs.promises.readFile(crushJson, 'utf8');
// desse jeito porque vai ser chamado várias outras vezes (Plantão Rufino);

app.get('/', async (_req, res) => {
  res.status(200).json(JSON.parse(await crushFile()));
}); // requisito 1

function readFilePromise(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, content) => {
      if (err) return reject(err);
      resolve(content);
    });
  });
} // referência: conteúdo Promises, dia 26.2

function findAsyncId(file, id) {
  return readFilePromise(file)
    .then((content) => JSON.parse(content).find((item) => item.id.toString() === id))
    .catch((err) => {
    console.error(`Erro ao ler arquivo: ${err.message}`);
  });
}

app.get('/:id', async (req, res) => {
  const { id } = req.params;
  const isId = await findAsyncId(crushJson, id);
  if (!isId) return res.status(404).send({ message: 'Crush não encontrado' });
  
  res.status(200).send(isId);
}); // requisito 2

function isValidName(name) {
  let response;

  if (!name) {
    response = 'O campo "name" é obrigatório';
  } else if (name.length < 3) {
    response = 'O "name" deve ter pelo menos 3 caracteres';
  }

  return response;
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
  if (rate < 1 || rate > 5) {
    return 'O campo "rate" deve ser um inteiro de 1 à 5';
  }
  if (!rate) {
    return patternResponse;
  }
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
  } else if (auth.length < 16) {
    response = 'Token inválido';
  }

  return response;
}

function createCrush(file, name, age, date) {
  return { id: file.length + 1, name, age, date };
}

app.post('/', async (req, res) => {
  const { name, age, date } = req.body;
  const isName = isValidName(name);
  const isAge = isValidAge(age);
  const isDate = isValidDate(date);
  const { authorization } = req.headers;
  const isAuth = isValidAuthorization(authorization);

  if (isAuth) return res.status(401).send({ message: isAuth });
  if (isName) return res.status(400).send({ message: isName });
  if (isAge) return res.status(400).json({ message: isAge });
  if (isDate) return res.status(400).send({ message: isDate });
  
  const newCrush = await readFilePromise(crushJson)
    .then((content) => createCrush(JSON.parse(content), name, age, date))
    .catch((err) => console.error(`Erro ao ler arquivo: ${err.message}`));
  return res.status(201).json(newCrush);
});

app.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, age, date } = req.body;
  const { authorization } = req.headers;
  const thisCrush = await findAsyncId(crushJson, id);
  
  const isName = isValidName(name);
  const isAge = isValidAge(age);
  const isDate = isValidDate(date);
  const isAuth = isValidAuthorization(authorization);
  if (isAuth) return res.status(401).send({ message: isAuth });
  if (isName) return res.status(400).send({ message: isName });
  if (isAge) return res.status(400).json({ message: isAge });
  if (isDate) return res.status(400).send({ message: isDate });
  
  thisCrush.name = name;
  thisCrush.age = age;
  thisCrush.date = date;
  return res.status(201).json(thisCrush);
});

app.use((err, _req, res, _next) => {
  res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`);
});

module.exports = app;
