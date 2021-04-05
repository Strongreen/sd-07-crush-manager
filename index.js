const express = require('express');
const fs = require('fs');

const validator = require('email-validator');
const randtoken = require('rand-token');

const app = express();
const SUCCESS = 200;
const PORT = 3000;
const PATH = './crush.json';
// não remova esse endpoint, e para o avaliador funcionar
app.use(express.json());
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});
// --------------------- MIDDLEWARES ---------------------
const validateTokenMiddleware = (request, response, next) => {
  const { authorization } = request.headers;
  if (!authorization) return response.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return response.status(401).json({ message: 'Token inválido' });
  next();
};
const validateNameMiddleware = (request, response, next) => {
  const { name } = request.body;
  if (!name) return response.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return response.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};
const validateDateMiddleware = (request, response, next) => {
  const { date } = request.body;
  if (!date || !date.rate || !date.datedAt) {
    return response.status(400)
    .json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  next();
};
const validateDateFormateMiddleware = (request, response, next) => {
  const { date } = request.body;
  const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  if (!(dateRegex.test(date.datedAt))) {
    return response.status(400)
    .json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};
const validateAge = (request, response, next) => {
  const { age } = request.body;
  if (!age) return response.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (Number(age) < 18) {
    return response.status(400).json({ message: 'O crush deve ser maior de idade' });
  }
  next();
};
const validateRateRangeMiddleware = (request, response, next) => {
  const { date } = request.body;
  if (Number(date.rate) < 1 || Number(date.rate) > 5) {
    return response.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' }); 
  }
  next();
};
// --------------------- REQ 1 ---------------------
app.get('/crush', (_request, response) => {
  const data = JSON.parse(fs.readFileSync(PATH));
  if (!data) return response.status(200).json([]);
  response.status(SUCCESS).json(data);
});
// --------------------- REQ 7 ---------------------
app.get('/crush/search', validateTokenMiddleware, (request, response) => {
  const data = JSON.parse(fs.readFileSync(PATH));
  const { q } = request.query;
  const result = data.filter((item) => item.name.toUpperCase().includes(q.toUpperCase()));
  if (result) return response.status(200).json(result);
  if (!result) return response.status(200).send([]);
  if (!q) return response.status(200).json(data);
});
// --------------------- REQ 2 ---------------------
app.get('/crush/:id', (request, response) => {
  const data = JSON.parse(fs.readFileSync(PATH));
  const { id } = request.params;
  const result = data.find((item) => item.id === Number(id));
  if (result) return response.status(200).send(result);
  if (request.params !== 'search') {
    return response.status(404).json({ message: 'Crush não encontrado' });
  }
});
// --------------------- REQ 3 ---------------------
app.post('/login', (request, response) => {
  const { email, password } = request.body;
  const token = randtoken.generate(16);
  if (!email) {
    return response.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validator.validate(email)) {
    return response.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return response.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return response.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  response.status(200).json({ token });
});

// --------------------- REQ 6 ---------------------
app.use(validateTokenMiddleware);
app.delete('/crush/:id', (request, response) => {
  const { id } = request.params;
  const data = JSON.parse(fs.readFileSync(PATH));
  const newData = data.filter((item) => item.id !== Number(id));
  fs.writeFileSync(PATH, JSON.stringify(newData, null, 2));
  response.status(200).json({ message: 'Crush deletado com sucesso' });
});

// --------------------- REQ 4 ---------------------
// https://www.codegrepper.com/code-examples/javascript/javascript+validate+date+dd%2Fmm%2Fyyyy
app.use(validateNameMiddleware);
app.use(validateDateMiddleware);
app.use(validateAge);
app.use(validateDateFormateMiddleware);
app.use(validateRateRangeMiddleware);
app.post('/crush', (request, response) => {
  const { name, age, date, id } = request.body;
  const dataFile = JSON.parse(fs.readFileSync(PATH));
  dataFile.push({ id: id || dataFile.length + 1, name, age, date });
  fs.writeFileSync(PATH, JSON.stringify(dataFile, null, 2));
  const data = JSON.parse(fs.readFileSync(PATH));
  response.status(201).send(data[data.length - 1]);
});

// --------------------- REQ 5 ---------------------

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
