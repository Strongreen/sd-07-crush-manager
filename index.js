const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

const point = './crush.json';
const pointById = '/crush/:id';

const writeCrush = async (data) => fs.writeFileSync(point, data);

function createToken() {
  const token = crypto.randomBytes(8).toString('hex');
    return token;
}

const authenticationToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization && authorization.toString().length > 8) {
    return next();
  }
  if (!authorization) {
    res.status(401).json({ message: 'Token não encontrado' });
  }
   return res.status(401).json({ message: 'Token inválido' });
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send({ message: 'O campo "name" é obrigatório' });
  } 
  if (name.length < 3) {
    return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  return next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).send({ message: 'O crush deve ser maior de idade' });
  }
  return next();
};

const validateDate = (req, res, next) => {
  const { date } = req.body;
  if (!date || !date.datedAt || date.rate === undefined) {
    return res.status(400).send({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  return next();
};

const validateDatedAt = (req, res, next) => {
  const { date } = req.body;
  const regex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
  if (date && !regex.test(date.datedAt)) {
    return res.status(400).send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  } 
  return next();
  };

  const validateRate = (req, res, next) => {
    const { date } = req.body;
    if (date.rate < 1 || date.rate > 5) {
      return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  } 
  return next();
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (req, res) => {
  const crushs = JSON.parse(await fs.promises.readFile(point, 'utf8'));
  return res.status(SUCCESS).send(crushs);
});

app.get(pointById, async (req, res) => {
  const { id: reqId } = req.params;
  const crushs = JSON.parse(await fs.promises.readFile(point, 'utf8'));
  const crush = crushs.find(({ id }) => id.toString() === reqId);
  if (crush) {
    return res.status(SUCCESS).send(crush);
  }
  return res.status(404).send({
    message: 'Crush não encontrado',
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  // Regex do exercicio 1 (26.5) não funcionou
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
  if (!email) {
    return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).send({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  if (!password) {
    return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  return res.status(SUCCESS).send({ token: createToken() });
});

app.use(authenticationToken);

app.post('/crush', validateName, validateAge, validateDate, validateDatedAt, validateRate,
    async (req, res) => {
  const { name, age, date } = req.body;

  const crushs = JSON.parse(await fs.promises.readFile(point, 'utf8'));
  const crush = { id: crushs.length + 1, name, age, date };
  const addCrush = crushs.concat(crush);
  
  await writeCrush(JSON.stringify(addCrush));

  res.status(201).json(crush);
});

app.put(pointById, validateName, validateAge, validateDate, validateDatedAt, validateRate,
 async (req, res) => {
  const { name, age, date } = req.body;
  const { id } = req.params;
  const crushs = JSON.parse(await fs.promises.readFile(point, 'utf8'));
  const crushById = crushs[id - 1];
  crushById.name = name;
  crushById.age = age;
  crushById.date = date;
  await writeCrush(JSON.stringify(crushs));

  res.status(SUCCESS).json(crushs[id - 1]);
});

app.delete(pointById, async (req, res) => {
  const { id } = req.params;
  const crushs = JSON.parse(await fs.promises.readFile(point, 'utf8'));
  const crushFilterById = crushs.filter((crush) => crush.id !== +id);
  await writeCrush(JSON.stringify(crushFilterById));
  res.status(SUCCESS).json({ message: 'Crush deletado com sucesso' });
});

app.listen(PORT, () => {
  console.log('Online');
});
