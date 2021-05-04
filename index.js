const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const path = require('path');

const fs = require('fs');

const idd = './crush/:id';
const crushFile = './crush.json';
const validatorEmail = /^\S+@\S+\.\S+$/;
const validatorDate = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/;

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const CREATED = 201;
const NOTFOUND = 404;
const ERROR = 400;
const UNAUTHORIZED = 401;
const PORT = '3000';

const messageDateDatedAtRate = {
  message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

const readFile = (file) => {
  const response = JSON.parse(fs.readFileSync(file), 'utf-8');
  return response;
};

const writeInFile = async (content) => (
  fs.writeFile(
    path.resolve(__dirname, '.', 'crush.json'),
    JSON.stringify(content),
    (err) => {
      if (err) throw err;
    },
  )
);

const emailTests = (email) => {
  if (email === undefined) {
    const error = { message: 'O campo "email" é obrigatório' };
    return error;
  } if (!validatorEmail.test(email)) {
    const error = { message: 'O "email" deve ter o formato "email@email.com"' };
    return error;
  }
  return undefined;
};

const passwordTests = (password) => {
  if (password === undefined) {
    const error = { message: 'O campo "password" é obrigatório' };
    return error;
  } if (password.length < 6) {
    const error = { message: 'A "senha" deve ter pelo menos 6 caracteres' };
    return error;
  }
  return undefined;
};

const middlewareLogin = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(UNAUTHORIZED).send({ message: 'Token não encontrado' });
  } if (authorization.length < 16) {
    return res.status(UNAUTHORIZED).send({ message: 'Token inválido' });
  }
  next();
};

const middlewareNameTest = (req, res, next) => {
  const { name } = req.body;
  if (name === undefined) {
    return res.status(ERROR).send({ message: 'O campo "name" é obrigatório' });
  } if (name.length < 3) {
    return res.status(ERROR).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const middlewareAgeTest = (req, res, next) => {
  const { age } = req.body;
  if (age === undefined) {
    return res.status(ERROR).send({ message: 'O campo "age" é obrigatório' });
  } if (age < 18) {
    return res.status(ERROR).send({ message: 'O crush deve ser maior de idade' });
  }
  next();
};

const middlewareDateTest = (req, res, next) => {
  if (req.body.date === undefined || Object.keys(req.body.date).length === 0) {
    return res.status(ERROR).send(messageDateDatedAtRate);
  }
  next();
};

const middlewareDatedAtTest = (req, res, next) => {
  const { datedAt } = req.body.date;
  if (datedAt === undefined) {
    return res.status(ERROR).send(messageDateDatedAtRate);
  } if (!validatorDate.test(datedAt)) {
    return res.status(ERROR).send({
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};

const middlewareRateTest = (req, res, next) => {
  const { rate } = req.body.date;
  if (rate === undefined) {
    return res.status(ERROR).send(messageDateDatedAtRate);
  } if (rate < 1 || rate > 5) {
    return res.status(ERROR).send({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  next();
};

app.get('/crush', (_req, res) => {
  const crushs = readFile(crushFile);
  return res.status(SUCCESS).send(crushs);
});

app.get('/crush/search', middlewareLogin, (req, res) => {
  const crushs = readFile(crushFile);
  const { q } = req.query;

  if (q === undefined) {
    return res.status(SUCCESS).send([]);
  } if (q === '') {
    return res.status(SUCCESS).send(crushs);
  }
  const crushIncludeQ = crushs.filter((c) => c.name.includes(q));  
  return res.status(SUCCESS).send(crushIncludeQ);
});

app.get('/crush/:id', (req, res) => {
  const crushs = readFile(crushFile);
  const { id } = req.params;
  const crushId = crushs.find((c) => c.id === parseInt(id, 10));
  if (crushId) {
    return res.status(SUCCESS).send(crushId);
  }
  return res.status(NOTFOUND).send({
    message: 'Crush não encontrado',
  });
});

app.put(idd, (req, res) => {
  const crushs = readFile(crushFile);
  const { id } = req.params;
  const crushId = crushs.find((c) => c.id === parseInt(id, 10));
  if (crushId) {
    const crushIndex = crushs.indexOf(crushId[0]);
    crushs[crushIndex] = {
      id: parseInt(id, 10),
      name: req.body.name,
      age: req.body.age,
      date: req.body.date,
    };
    return res.status(SUCCESS).send(crushId[crushIndex]);
  }
  return res.status(NOTFOUND).send({
    message: 'Crush não encontrado',
  });
});

app.delete('/crush/:id', middlewareLogin, async (req, res) => {
  const crushs = readFile(crushFile);
  const { id } = req.params;
  const newCrushsWithOutCrushId = crushs.filter((c) => c.id !== parseInt(id, 10));
  await writeInFile(newCrushsWithOutCrushId);
  return res.status(SUCCESS).send({ message: 'Crush deletado com sucesso' });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const resultEmailTest = emailTests(email);
  if (resultEmailTest) {
    return res.status(ERROR).send(resultEmailTest);
  }

  const resultPasswordTest = passwordTests(password);
  if (resultPasswordTest) {
    return res.status(ERROR).send(resultPasswordTest);
  }

  const token = crypto.randomBytes(8).toString('hex');
  return res.status(SUCCESS).send({ token });
});

app.post(
  '/crush',
  middlewareLogin,
  middlewareNameTest,
  middlewareAgeTest,
  middlewareDateTest,
  middlewareDatedAtTest,
  middlewareRateTest,
  async (req, res) => {
    const { name, age, date } = req.body;
    const oldCrushs = readFile(crushFile);
    const id = oldCrushs.length + 1;
    const newArrayOfCrushs = [...oldCrushs, { id, name, age, date }];
    await writeInFile(newArrayOfCrushs);
    return res.status(CREATED).send({ id, name, age, date });
  },
);

app.listen(PORT, () => { console.log('Online'); });
