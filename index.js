const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const randtoken = require('rand-token');
const validator = require('email-validator');
// const rescue = require('express-rescue');

const app = express();
app.use(express.json());

const SUCCESS = 200;
const PORT = '3000';
const crushJson = './crush.json';
const crushId = '/crush/:id';

async function readCrush() {
  const crush = await fs.readFile(
    path.join(__dirname, '.', 'crush.json'),
    'utf-8',
  );
  return JSON.parse(crush);
}

// Middlewares:
function tokenMiddleware(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  next();
}
function nameAgeMiddleware(req, res, next) {
  const { name, age } = req.body;
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return res.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age < 18) return res.status(400).json({ message: 'O crush deve ser maior de idade' });
  next();
}
function dateFormatMiddleware(req, res, next) {
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  const { date } = req.body;
  if (!date || !dateRegex.test(date.datedAt)) {
    return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
}
function rateMiddleware(req, res, next) {
  const { date } = req.body;
  if (!date || date.rate !== parseInt(date.rate, 10) || date.rate > 5 || date.rate < 1) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
}
function dateAndRateMiddleware(req, res, next) {
  const { date } = req.body;
  if (!date || !date.datedAt || (!date.rate && date.rate !== 0)) {
    return res.status(400).json({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  next();
}

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// Req 1 ---------------------------------------------------------------------------
app.get('/crush', async (_req, res) => {
  const crush = await readCrush();
  if (crush.length > 0) {
    return res.status(SUCCESS).json(crush);
  }
  return res.status(SUCCESS).json([]);
});

// Req 7 ---------------------------------------------------------------------------
app.get('/crush/search', tokenMiddleware, async (req, res) => {
  const { q } = req.query;
  const crushs = await readCrush();
  const search = crushs.filter((star) => star.name.toUpperCase().includes(q.toUpperCase()));
  if (!q || q === '') return res.status(200).json(crushs);
  if (search) return res.status(200).json(search);
  if (!search) return res.status(200).json([]);
});

// Req 2 ---------------------------------------------------------------------------
app.get(crushId, async (req, res) => {
  const { id } = req.params;
  const crush = await fs.readFile(
    path.join(__dirname, '.', 'crush.json'),
    'utf-8',
  );
  const jsonCrush = JSON.parse(crush);
  const findId = jsonCrush.find((star) => star.id === parseInt(id, 10));
  if (findId == null) {
    return res.status(404).json({ message: 'Crush não encontrado' });
  }
  return res.status(SUCCESS).json(findId);
});

// Req 3 ---------------------------------------------------------------------------
app.post('/login', (req, res) => {
  const token = randtoken.generate(16);
  const { email, password } = req.body;
  const validatorEmail = validator.validate(email);
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validatorEmail) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  return res.status(SUCCESS).json({ token });
});

app.use(tokenMiddleware);

// Req 6 ---------------------------------------------------------------------------
app.delete(crushId, async (req, res) => {
  const { id } = req.params;
  const crush = await readCrush();
  const newFileCrush = crush.filter((star) => star.id !== parseInt(id, 10));
  await fs.writeFile(crushJson, JSON.stringify(newFileCrush, null, 2));
  return res.status(200).json({ message: 'Crush deletado com sucesso' });
});

app.use(nameAgeMiddleware);
app.use(dateAndRateMiddleware);
app.use(dateFormatMiddleware);
app.use(rateMiddleware);

// Req 4 ---------------------------------------------------------------------------
app.post('/crush', async (req, res) => {
  const { name, age, date } = req.body;
  const crushDocument = await readCrush();
  const numId = crushDocument.length + 1;
  crushDocument.push({ id: numId, name, age, date });
  await fs.writeFile(crushJson, JSON.stringify(crushDocument, null, 2));
  return res.status(201).json({ id: numId, name, age, date });
});

// Req 5 ---------------------------------------------------------------------------
app.put(crushId, async (req, res) => {
  const { name, age, date } = req.body;
  const { id } = req.params;
  const crushDocument = await readCrush();
  const indexWriteDocument = id - 1;
  crushDocument[indexWriteDocument].name = name;
  crushDocument[indexWriteDocument].age = age;
  crushDocument[indexWriteDocument].date = date;
  await fs.writeFile(crushJson, JSON.stringify(crushDocument, null, 2));
  return res.status(200).json(crushDocument[indexWriteDocument]);
});

app.listen(PORT, () => { console.log('Online'); });
