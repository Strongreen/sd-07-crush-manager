const express = require('express');
const fs = require('fs').promises;
const bodyParser = require('body-parser');

const app = express();
const SUCCESS = 200;
const NO_TOKEN = 'Token não encontrado';
const INVALID_TOKEN = 'Token inválido';
const pathCrushId = '/crush/:id';

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

const readCrushFile = async () => {
  const file = await fs.readFile('./crush.json', 'utf-8');
  return JSON.parse(file);
};

const validateEmail = (mail) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(mail);
};

const validatePassword = (secret) => {
  if (secret && secret.length >= 6) {
    return true;
  } return false;
};

const rand = () => Math.random(0).toString(36).substr(2);
const token = (length) => (rand() + rand() + rand() + rand()).substr(0, length);

const isDateValid = (datedAt) => {
  const verifyDate = /(((^0|^1|^2)[0-9])|(^3[0-1]))\/((0[0-9])|(1[0-2]))\/(((19|20)[0-9]{2}$))/mg;
  return verifyDate.test(datedAt);
};

const validateUser = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: NO_TOKEN });
  }

  if (authHeader.length !== 16) {
    return res.status(401).json({ message: INVALID_TOKEN });
  }
};

const validateName = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name && name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
};

const validateAge = (req, res) => {
  const { age } = req.body;

  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age && age < 18) {
    return res.status(400).json({ message: 'O crush deve ser maior de idade' });
  }
};

const validateDAte = (req, res) => {
  const { date } = req.body;

  if (!date || !date.datedAt || !date.rate) {
    return res
      .status(400)
      .json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  if (!isDateValid(date.datedAt)) {
    return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
};

const validateRate = (req, res) => {
  const { date } = req.body;

  if (date.rate < 0 || date.rate > 6) {
    return res
    .status(400)
    .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
};

app.get('/crush', async (req, res) => {
  const file = await readCrushFile();
  if (!file) {
    res.status(SUCCESS).json([]);
  } else {
    res.status(SUCCESS).json(file);
  }
});

app.get('/crush/search', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: NO_TOKEN });
  }

  if (authHeader.length !== 16) {
    return res.status(401).json({ message: INVALID_TOKEN });
  }

  const { q } = req.query;

  const file = await readCrushFile();
  if (!q) {
    return res.status(200).json(file);
  }

  const results = file.filter((crush) => crush.name.includes(q));
  return res.status(200).json(results);
});

app.get(pathCrushId, async (req, res) => {
  const file = await readCrushFile();
  const { id } = req.params;
  const numberID = parseFloat(id);
  const searchCrush = file.find((crush) => crush.id === numberID);

  if (!searchCrush) {
    res.status(404).json({ message: 'Crush não encontrado' });
  } else {
    res.status(SUCCESS).json(searchCrush);
  }
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);

  if (!email) {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } else if (!isEmailValid) {
    res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  } else if (!password) {
    res.status(400).json({ message: 'O campo "password" é obrigatório' });
  } else if (!isPasswordValid) {
    res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  } else {
    res.status(SUCCESS).json({ token: `${token(16)}` });
  }
});

app.post('/crush', async (req, res) => {
  validateUser(req, res);

  const file = await readCrushFile();

  const { name, age, date } = req.body;
  const id = file.length + 1;

  validateName(req, res);
  validateAge(req, res);
  validateDAte(req, res);
  validateRate(req, res);

  const newCrush = ({ name, age, id, date });
  file.push(newCrush);

  fs.writeFile('./crush.json', JSON.stringify(file));
  return res.status(201).json(newCrush);
});

app.put(pathCrushId, async (req, res) => {
  validateUser(req, res);

  const { id } = req.params;
  const file = await readCrushFile();
  const numberID = parseFloat(id);
  const { name, age, date } = req.body;

  validateName(req, res);
  validateAge(req, res);
  validateAge(req, res);
  validateRate(req, res);

  const searchCrush = file.find((crush) => crush.id === numberID);
  searchCrush.name = name;
  searchCrush.age = age;
  searchCrush.date = date;

  return res.status(200).json(searchCrush);
});

// complementar
app.delete(pathCrushId, async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: NO_TOKEN });
  }

  if (authHeader.length !== 16) {
    return res.status(401).json({ message: INVALID_TOKEN });
  }

  const { id } = req.params;
  const file = await readCrushFile();

  if (authHeader.length === 16) {
    const indexId = parseFloat(id);
    file.splice(indexId, 1);
    res.status(200).json({ message: 'Crush deletado com sucesso' });
  }
});

app.listen(3000, () => console.log('listening on port 3000'));
