const express = require('express');
const rescue = require('express-rescue');
const fs = require('fs').promises;
let crushes = require('./crush.json');
const tokens = require('./tokens.json');

const crushFile = './crush.json';
const crushWithId = '/crush/:id';

const app = express();
const SUCCESS = 200;

async function obrigatoryField(res, field, date) {
  if (!date) {
    await res.status(400).send({ message: `O campo "${field}" é obrigatório` });
  }
  await res.status(400).send(
    { message: `O campo "${field}" é obrigatório e "datedAt" e "rate" não podem ser vazios` },
  );
}

async function verifyToken(res, token) {
  if (!token) {
    await res.status(401).send({ message: 'Token não encontrado' });
  }
  const checkToken = tokens.find((item) => item === token);
  if (!checkToken) {
    await res.status(401).send({ message: 'Token inválido' });
  }
}

async function checkFields(res, name, age) {
  if (!name) {
    await obrigatoryField(res, 'name');
  }
  if (name.length < 3) {
    await res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (!age) {
    await obrigatoryField(res, 'age');
  }
  if (age < 18) {
    await res.status(400).send({ message: 'O crush deve ser maior de idade' });
  }
}

async function checkRate(res, rate) {
  if (rate < 1 || rate > 5) {
    await res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!rate) await obrigatoryField(res, 'date', 1);
}

async function checkDate(res, date) {
  if (!date || !date.datedAt) {
    await obrigatoryField(res, 'date', 1);
  }
  const { datedAt, rate } = date;
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d$/;
  if (!dateRegex.test(datedAt)) {
    await res.status(400).send(
      { message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' },
    );
  }
 await checkRate(res, rate);
}

async function checkCrush(res, crush) {
  if (!crush) await res.status(404).send({ message: 'Crush não encontrado' });
}

async function checkMail(res, email) {
  const regex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(email)) {
    await res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
}

async function allCrushes(res) {
  const readFile = await fs.readFile(crushFile);
  await res.status(SUCCESS).send(JSON.parse(readFile));
}

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', rescue(async (_req, res) => allCrushes(res)));

app.get('/crush/search', rescue(async (req, res) => {
  const { authorization } = req.headers;
  await verifyToken(res, authorization);
  const param = req.query.q;
  if (!param || param === '') await allCrushes(res);
  const results = crushes.filter((item) => item.name.startsWith(param));
  await res.status(200).send(results);
}));

app.get(crushWithId, rescue(async (req, res) => {
  const { id } = req.params;
  const crush = crushes.find((item) => item.id === parseInt(id, 10));
  await checkCrush(res, crush);
  await res.status(SUCCESS).send(crush);
}));

app.post('/login', rescue(async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    await obrigatoryField(res, 'email');
  }
  await checkMail(res, email);
  if (!password) {
    await obrigatoryField(res, 'password');
  }
  if (password.length < 6) {
    await res.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  const generateToken = () => Math.random().toString(36).substr(2);
  const initialToken = `${generateToken()}${generateToken()}`;
  const token = initialToken.slice(0, 16);
  tokens.push(token);
  await fs.writeFile('./tokens.json', JSON.stringify(tokens));
  await res.status(SUCCESS).send({ token });
}));

app.post('/crush', rescue(async (req, res) => {
  const { authorization } = req.headers;
  await verifyToken(res, authorization);
  const { name, age, date } = req.body;
  await checkFields(res, name, age);
  await checkDate(res, date);
  const { datedAt, rate } = date;
  const crush = {
    id: crushes.length + 1,
    name,
    age,
    date: {
      datedAt,
      rate,
    },
  };
  crushes.push(crush);
  await fs.writeFile(crushFile, JSON.stringify(crushes));
  return res.status(201).send(crush);
}));

app.put(crushWithId, rescue(async (req, res) => {
  const { authorization } = req.headers;
  await verifyToken(res, authorization);
  const id = parseInt(req.params.id, 10);
  const crush = crushes.find((item) => item.id === id);
  await checkCrush(res, crush);
  const { name, age, date } = req.body;
  await checkFields(res, name, age);
  await checkDate(res, date);
  crush.name = name;
  crush.age = age;
  crush.date = date;
  await fs.writeFile(crushFile, JSON.stringify(crushes));
  await res.status(200).send({
    id: crush.id,
    name,
    age,
    date,
  });
}));

app.delete(crushWithId, rescue(async (req, res) => {
  const { authorization } = req.headers;
  await verifyToken(res, authorization);
  const id = parseInt(req.params.id, 10);
  const crush = crushes.find((item) => item.id === id);
  await checkCrush(res, crush);
  crushes = crushes.filter((item) => item.id !== id);
  await fs.writeFile(crushFile, JSON.stringify(crushes));
  await res.status(200).send({ message: 'Crush deletado com sucesso' });
}));

app.use((err, _req, res, _next) => res.status(500).json({ error: `Erro: ${err.message}` }));

app.listen(3000, () => console.log('App rodando na porta 3000'));
