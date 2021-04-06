const express = require('express');
const rescue = require('express-rescue');
const fs = require('fs').promises;
let crushes = require('./crush.json');
const tokens = require('./tokens.json');

const crushFile = './crush.json';
const crushWithId = '/crush/:id';

const app = express();
const SUCCESS = 200;

const verifyDateMd = (req, res, next) => {
  const { date } = req.body;
  const dateMessage = {
    message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
  };
  if (!date) return res.status(400).send(dateMessage);
  const { rate, datedAt } = date;
  if (rate === 0) {
    return res.status(400).send(
    { message: 'O campo "rate" deve ser um inteiro de 1 à 5' },
    );
  }
  if (!datedAt || !rate) return res.status(400).send(dateMessage);
  next();
};

const obrigatoryFieldsMd = (req, res, next) => {
  const { name, age } = req.body;
  if (!name) return res.status(400).send({ message: 'O campo "name" é obrigatório' });
  if (!age) return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  next();
};

const verifyTokenMd = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ message: 'Token não encontrado' });
  }
  const checkToken = tokens.find((item) => item === authorization);
  if (!checkToken) {
    return res.status(401).send({ message: 'Token inválido' });
  }
  next();
};

const checkFieldsMd = (req, res, next) => {
  const { name, age } = req.body;
  if (name.length < 3) {
    return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (age < 18) {
    return res.status(400).send({ message: 'O crush deve ser maior de idade' });
  }
  next();
};

const checkRateMd = (req, res, next) => {
  const { date } = req.body;
  const { rate } = date;
  if (rate < 1 || rate > 5) {
    return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const checkDateMd = (req, res, next) => {
  const { date } = req.body;
  const { datedAt } = date;
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d$/;
  if (!dateRegex.test(datedAt)) {
    return res.status(400).send(
      { message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' },
    );
  }
  next();
};

const checkCrushMd = (req, res, next) => {
  const { id } = req.params;
  const crush = crushes.find((item) => item.id === parseInt(id, 10));
  if (!crush) return res.status(404).send({ message: 'Crush não encontrado' });
  next();
};

const checkMailMd = (req, res, next) => {
  const { email, password } = req.body;
  const regex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!email) return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  if (!password) {
    return res.status(400).send(
    { message: 'O campo "password" é obrigatório' },
    );
  }
  if (!regex.test(email)) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (password.length < 6) {
    return res.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  next();
};

async function allCrushesMd(req, res, next) {
  const param = req.query.q;
  if (!param || param === '') {
    const readFile = await fs.readFile(crushFile);
    await res.status(SUCCESS).send(JSON.parse(readFile));
  }
  next();
}

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', rescue(allCrushesMd));

app.get('/crush/search', verifyTokenMd, rescue((req, res) => {
  const param = req.query.q;
  const results = crushes.filter((item) => item.name.startsWith(param));
  return res.status(200).send(results);
}));

app.get(crushWithId, checkCrushMd, rescue((req, res) => {
  const { id } = req.params;
  const crush = crushes.find((item) => item.id === parseInt(id, 10));
  return res.status(SUCCESS).send(crush);
}));

app.post('/login', checkMailMd, rescue(async (req, res) => {
  const generateToken = () => Math.random().toString(36).substr(2);
  const initialToken = `${generateToken()}${generateToken()}`;
  const token = initialToken.slice(0, 16);
  tokens.push(token);
  await fs.writeFile('./tokens.json', JSON.stringify(tokens));
  await res.status(SUCCESS).send({ token });
}));

app.post('/crush', verifyTokenMd, obrigatoryFieldsMd, verifyDateMd, checkFieldsMd,
  checkDateMd, checkRateMd, rescue(async (req, res) => {
  const { name, age, date } = req.body;
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

app.put(crushWithId, verifyTokenMd, checkCrushMd, obrigatoryFieldsMd, verifyDateMd,
  checkFieldsMd, checkDateMd, checkRateMd, rescue(async (req, res) => {
  const { name, age, date } = req.body;
  const id = parseInt(req.params.id, 10);
  const crush = crushes.find((item) => item.id === id);
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

app.delete(crushWithId, verifyTokenMd, checkCrushMd, rescue(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  crushes = crushes.filter((item) => item.id !== id);
  await fs.writeFile(crushFile, JSON.stringify(crushes));
  await res.status(200).send({ message: 'Crush deletado com sucesso' });
}));

app.use((err, _req, res, _next) => res.status(500).json({ error: `Erro: ${err.message}` }));

app.listen(3000, () => console.log('App rodando na porta 3000'));
