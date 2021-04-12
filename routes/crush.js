const express = require('express');
const fs = require('fs').promises;

const app = express();

const readCrushes = async () => {
  const data = await fs.readFile(`${__dirname}/../crush.json`, 'utf-8');
  return JSON.parse(data);
};

app.get('/', async (_req, res) => {
  const crushes = await readCrushes();
  res.status(200).send(crushes);
});

app.get('/:id', async (req, res) => {
  const crushes = await readCrushes();
  const { id } = req.params;
  const validateId = crushes.some((crush) => crush.id === Number(id));

  if (!validateId) {
    res.status(404).send({
    message: 'Crush não encontrado',
    });
  }
  const crushById = crushes.find((crush) => crush.id === Number(id));
  res.status(200).send(crushById);
});

const tokenValidation = (token) => token.length === 16;

const emptyOrUdefined = (value) => {
  if (value === undefined || value === '') return true;
  return false;
};
const authMiddleware = (req, res, next) => {
  if (req.headers.authorization) {
    const { authorization } = req.headers;
    if (tokenValidation(authorization)) next();
    else res.status(401).send({ message: 'Token inválido' });
  } else {
    res.status(401).send({ message: 'Token não encontrado' });
  }
};

const emptyDate = (date) => {
  if (emptyOrUdefined(date)) return true;
  return emptyOrUdefined(date.datedAt) || emptyOrUdefined(date.rate);
};

const validName = (name) => name.length >= 3;

const validAge = (age) => age >= 18;

const validDate = (date) => {
  const regexDate = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  return regexDate.test(date);
};

const validRate = (rate) => rate >= 1 && rate <= 5;

const emptyOrUdefinedMiddleware = (req, res, next) => {
  const newCrush = { name: req.body.name,
    age: req.body.age,
    date: req.body.date,
  };
  if (emptyOrUdefined(newCrush.name)) {
    res.status(400).send({ message: 'O campo "name" é obrigatório' });
  } else if (emptyOrUdefined(newCrush.age)) {
    res.status(400).send({ message: 'O campo "age" é obrigatório' });
  } else if (emptyDate(newCrush.date)) {
    res.status(400).send({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  } else next();
};

const validateNewCrush = (req, res, next) => {
  const newCrush = { name: req.body.name,
    age: req.body.age,
    date: { 
      datedAt: req.body.date.datedAt,
      rate: req.body.date.rate,
  } };
  if (!validName(newCrush.name)) {
    res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  } else if (!validAge(newCrush.age)) {
    res.status(400).send({ message: 'O crush deve ser maior de idade' });
  } else if (!validDate(newCrush.date.datedAt)) {
    res.status(400).send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  } else if (!validRate(newCrush.date.rate)) {
    res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  } else next();
};
app.post('/', authMiddleware, emptyOrUdefinedMiddleware, validateNewCrush,
 async (req, res) => {
  const crushes = await readCrushes();
  const newId = crushes.length + 1;
  const newCrush = {
    id: newId,
    name: req.body.name,
    age: req.body.age,
    date: { 
      datedAt: req.body.date.datedAt,
      rate: req.body.date.rate,
  } }; 
  
  crushes.push(newCrush);
  try {
    await fs.writeFile(`${__dirname}/../crush.json`, JSON.stringify(crushes));
    res.status(201).send({ newCrush });
  } catch (error) {
    throw new Error(error.message);
  }
});

app.put('/:id', authMiddleware, emptyOrUdefinedMiddleware, validateNewCrush,
async (req, res) => {
  const crushes = await readCrushes();
  const { id } = req.params;
  const editedCrush = {
    id: Number(id),
    name: req.body.name,
    age: req.body.age,
    date: { 
      datedAt: req.body.date.datedAt,
      rate: req.body.date.rate,
  } };
  crushes[id - 1] = editedCrush;
  try {
    await fs.writeFile(`${__dirname}/../crush.json`, JSON.stringify(crushes));
    res.status(200).send({ editedCrush });
  } catch (error) {
    throw new Error(error.message);
  }
});

app.delete('/:id', authMiddleware,
async (req, res) => {
  const crushes = await readCrushes();
  const { id } = req.params;
  const index = Number(id) - 1;
  crushes.splice(index, 1);
  
  try {
    await fs.writeFile(`${__dirname}/../crush.json`, JSON.stringify(crushes));
    res.status(200).send({ message: 'Crush deletado com sucesso' });
  } catch (error) {
    throw new Error(error.message);
  }
});

module.exports = app;
