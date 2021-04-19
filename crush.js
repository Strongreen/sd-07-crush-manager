const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const crush = './crush.json';

const app = express();

app.use(bodyParser.json());

const crushData = () => fs.promises.readFile(crush, 'utf-8');

app.get('/', async (_req, res) => res.status(200).json(JSON.parse(await crushData())));

const crushIDs = async (id) => {
  const findID = JSON.parse(await crushData());
  return findID.find((crushInfos) => crushInfos.id === Number(id));
};

const checkToken = (token) => {
  let message;

  if (!token) {
    message = 'Token não encontrado';
  } else if (token.toString().length < 16) {
    message = 'Token inválido';
  }
  return message;
};

app.get('/search', async (req, res) => {
  const invalidToken = checkToken(req.headers.authorization);
  if (invalidToken) {
    return res.status(401).json({ message: invalidToken });
  }
  const { q } = req.query;
  if (q === undefined) {
    return res.status(200).json(JSON.parse(await crushData()));
  }
  if (q !== undefined) {
    const crushes = JSON.parse(await crushData());
    console.log('crushes', crushes);
    const search = crushes.filter((item) => item.name.includes(q));
    if (search === []) {
      return res.status(200).json([]);
    }
    return res.status(200).json(search);
  }
  return console.log('teste');
});

app.get('/:id', async (req, res) => {
  const { id } = req.params;
  const IDmatch = await crushIDs(id);
  if (!IDmatch) {
    return res.status(404).json({ message: 'Crush não encontrado' });
  }
  return res.status(200).json(IDmatch);
});

const checkName = (name) => {
  if (!name) return 'O campo "name" é obrigatório';
  if (name.length < 3) return 'O "name" deve ter pelo menos 3 caracteres';
};

const checkAge = (age) => {
  if (!age) return 'O campo "age" é obrigatório';
  if (age < 18) return 'O crush deve ser maior de idade';
};

const checkDateandRate = (date) => {
  if (!date || !date.datedAt || date.rate === undefined) {
    return 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';
  }
  const validDate = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  if (!validDate.test(date.datedAt)) {
    return 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"';
  }
};

const checkRate = (date) => {
  if (!date || date.rate < 1 || date.rate > 5) return 'O campo "rate" deve ser um inteiro de 1 à 5';
};

const newCrushValidations = (res, name, age, date) => {
  const invalidName = checkName(name);
  const invalidAge = checkAge(age);
  const invalidDate = checkDateandRate(date);
  const invalidRate = checkRate(date);

  if (invalidName) {
    return res.status(400).json({ message: invalidName });
  }
  if (invalidAge) {
    return res.status(400).json({ message: invalidAge });
  }
  if (invalidDate) {
    return res.status(400).json({ message: invalidDate });
  }
  if (invalidRate) {
    return res.status(400).json({ message: invalidRate });
  }
};

app.post('/', async (req, res) => {
  const { name, age, date } = req.body;
  const invalidToken = checkToken(req.headers.authorization);
  if (invalidToken) {
    return res.status(401).json({ message: invalidToken });
  }
  const error = newCrushValidations(res, name, age, date);
  if (error) {
    return error;
  }
  // const newCrush = endpointValidation(req);
  const crushes = JSON.parse(await crushData());
  const newCrush = { id: crushes.length + 1, name, age, date };
  const addCrush = [...crushes, newCrush];

  await fs.promises.writeFile(crush, JSON.stringify(addCrush));
  res.status(201).send(newCrush);
});

app.put('/:id', async (req, res) => {
  const invalidToken = checkToken(req.headers.authorization);
  if (invalidToken) {
    return res.status(401).json({ message: invalidToken });
  }
  const { name, age, date } = req.body;
  const { id } = req.params;
  const error = newCrushValidations(res, name, age, date);
  if (error) {
    return error;
  }
  const editCrush = await crushIDs(id);
  if (editCrush) {
    editCrush.name = name;
    editCrush.age = age;
    editCrush.date = date;
    return res.status(200).json(editCrush);
  }
});

app.delete('/:id', async (req, res) => {
  const invalidToken = checkToken(req.headers.authorization);
  if (invalidToken) {
    return res.status(401).json({ message: invalidToken });
  }

  const { id } = req.params;
  const crushes = await crushData();
  const crushUpdated = JSON.parse(crushes).filter((person) => person.id !== Number(id));

  await fs.promises.writeFile(crush, JSON.stringify(crushUpdated));
  res.status(200).send({ message: 'Crush deletado com sucesso' });
});

module.exports = app;
