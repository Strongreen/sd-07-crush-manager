const express = require('express');
const fs = require('fs');

const app = express();

async function readFileCrush() {
  const content = await fs.promises.readFile('./crush.json', 'utf8');
  return JSON.parse(content);
}

// Desafio 1
app.get('/', async (_req, res) => {
  const crushData = await readFileCrush();
  res.status(200).send(crushData);
});

function verifyToken(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ message: 'Token não encontrado' });
  } 
  if (authorization.length < 16) {
    return res.status(401).send({ message: 'Token inválido' });
  }
  next();
}

async function writeCrushFile(content) {
  const writeFile = await fs.promises.writeFile('./crush.json', JSON.stringify(content));
  return writeFile;
}

// Desafio 7
app.get('/search', verifyToken, async (req, res) => {
  const searchTerm = req.query.q;
  const crushData = await readFileCrush();
  const newCrushData = crushData.filter((crush) => crush.name.includes(searchTerm));
  if (!searchTerm) {
    return res.status(200).send({ crushData });
  }
  if (Object.keys(newCrushData).length === 0) {
    return res.status(200).send([]);
  }
  await writeCrushFile(newCrushData);
  return res.status(200).send(newCrushData);
});

// Desafio 2
app.get('/:id', async (req, res) => {
  const crushData = await readFileCrush();
  const { id } = req.params;
  const idSelected = crushData.findIndex((crush) => crush.id === parseInt(id, 10));
  if (idSelected === -1) {
    res.status(404).send({ message: 'Crush não encontrado' });
  }
  res.status(200).send(crushData[idSelected]);
});

//  Desafio 4
function verifyName(req, res, next) {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send({ message: 'O campo "name" é obrigatório' });
  } 
  if (name.length < 3) {
    return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
}

function verifyAge(req, res, next) {
  const { age } = req.body;
  if (!age) {
    return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  } 
  if (age < 18) {
    return res.status(400).send({ message: 'O crush deve ser maior de idade' });
  }
  next();
}

function verifyDateAt(req, res, next) {
  const { date } = req.body;
  const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  if (!date || !date.datedAt) {
    return res.status(400).send({ 
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  if (!dateRegex.test(date.datedAt)) {
    return res.status(400).send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
}

function verifyRate(req, res, next) {
  const { date } = req.body;
  const { rate } = date;
  if (rate === undefined) {
    return res.status(400).send({ 
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  if (rate < 1 || rate > 5) {
    return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
}

app.post('/', verifyToken, verifyName, verifyAge, verifyDateAt, verifyRate, async (req, res) => {
  const { name, age, date } = req.body;
  const { datedAt, rate } = date;
  const crushData = await readFileCrush();
  const id = crushData.length + 1;
  const newCrush = {
    id,
    name,
    age,
    date: {
      datedAt,
      rate,
    },
  };
  crushData.push(newCrush);
  await writeCrushFile(crushData);
  return res.status(201).send(newCrush);
});

// Desafio 5
app.put('/:id', verifyToken, verifyName, verifyAge, verifyDateAt, verifyRate, async (req, res) => {
  const { name, age, date } = req.body;
  const { datedAt, rate } = date;
  const { id } = req.params;
  const crushData = await readFileCrush();
  const newCrush = {
    id: parseInt(id, 10),
    name,
    age,
    date: {
      datedAt,
      rate,
    },
  };
  crushData[id - 1] = newCrush;
  await writeCrushFile(crushData);
  return res.status(200).send(newCrush);
});

// Desafio 6
app.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const crushData = await readFileCrush();
  const newCrushData = crushData.filter((crush) => crush.id !== id);
  await writeCrushFile(newCrushData);
  return res.status(200).send({ message: 'Crush deletado com sucesso' });
});

module.exports = app;