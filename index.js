const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const file = 'crush.json';
const idRoute = '/crush/:id';
const SUCCESS = 200;
const CREATED = 201;
const BAD_REQ = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const PORT = 3000;

const tokenGenerator = () => crypto.randomBytes(8).toString('hex');

function checkMatchObjct(objct) {
  return !objct || !objct.datedAt || objct.rate === '' || objct.rate === undefined;
}

function validate(email) {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{3}$/;
  return regex.test(email);
}

function verifyAuth(req, res, next) {
  const { authorization: auth } = req.headers;
  if (!auth) return res.status(UNAUTHORIZED).json({ message: 'Token não encontrado' });
  if (auth.length !== 16) return res.status(UNAUTHORIZED).json({ message: 'Token inválido' });
  next();
}

function verifyDate(req, res, next) {
  const { date } = req.body;
  const dateRegx = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;

  if (checkMatchObjct(date)) {
    return res.status(BAD_REQ)
      .json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  if (!dateRegx.test(date.datedAt)) {
    return res.status(BAD_REQ)
      .json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (date.rate < 1 || date.rate > 5) {
    return res.status(BAD_REQ).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
}

function verifyInfo(req, res, next) {
  const { name, age } = req.body;

  if (!name) return res.status(BAD_REQ).json({ message: 'O campo "name" é obrigatório' });
  if (!age) return res.status(BAD_REQ).json({ message: 'O campo "age" é obrigatório' });
  if (name.length < 3) {
    return res.status(BAD_REQ).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (age < 18) {
    return res.status(BAD_REQ).json({ message: 'O crush deve ser maior de idade' });
  }

  next();
}

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => response.status(SUCCESS).send());

// 1
app.get('/crush', async (_req, res) => {
  const crushes = await fs.readFile(file, 'utf-8');
  const object = JSON.parse(crushes);

  return res.status(SUCCESS).json(object);
});

// 7
app.get('/crush/search', verifyAuth, async (req, res) => {
  const data = JSON.parse(await fs.readFile(file, 'utf-8'));
  const { q: term } = req.query;
  if (!term) return res.status(SUCCESS).json(data);

  const findCrushes = data.filter(({ name }) => name.includes(term));
  return res.status(SUCCESS).json(findCrushes);
});

// 2
app.get(idRoute, async (req, res) => {
  const id = Number(req.params.id);

  const crushes = JSON.parse(await fs.readFile(file, 'utf-8'));
  const crush = crushes.find(({ id: crushID }) => crushID === id);

  if (!crush) return res.status(NOT_FOUND).json({ message: 'Crush não encontrado' });
  return res.status(SUCCESS).json(crush);
});

// 3
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const token = tokenGenerator();
  
  if (!email) return res.status(BAD_REQ).json({ message: 'O campo "email" é obrigatório' });
  if (!password) return res.status(BAD_REQ).json({ message: 'O campo "password" é obrigatório' });
  if (!validate(email)) { 
    return res.status(BAD_REQ).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (password.length < 6) { 
    return res.status(BAD_REQ).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }

  return res.status(SUCCESS).json({ token });
});

// 4
app.post('/crush', verifyAuth, verifyInfo, verifyDate, async (req, res) => {
  const data = JSON.parse(await fs.readFile(file, 'utf-8'));
  const addCrush = { ...req.body, id: data.length + 1 };

  data.push(addCrush);
  await fs.writeFile(file, JSON.stringify(data));

  return res.status(CREATED).json(addCrush);
});

// 5
app.put(idRoute, verifyAuth, verifyInfo, verifyDate, async (req, res) => {
  const id = Number(req.params.id);
  const data = JSON.parse(await fs.readFile(file, 'utf-8'));
  const updatedInfo = { ...req.body, id };
  const newData = data.map((crush) => {
    if (crush.id === id) return updatedInfo;
    return crush;
  });
  await fs.writeFile(file, JSON.stringify(newData));

  return res.status(SUCCESS).json(updatedInfo);
});

// 6
app.delete(idRoute, verifyAuth, async (req, res) => {
  const id = Number(req.params.id);
  const data = JSON.parse(await fs.readFile(file, 'utf-8'));
  const newData = data.filter((crush) => crush.id !== id);
  await fs.writeFile(file, JSON.stringify(newData));

  return res.status(SUCCESS).json({ message: 'Crush deletado com sucesso' });
});

app.listen(PORT, () => { console.log('Online'); });
