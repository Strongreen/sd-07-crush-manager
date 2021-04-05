const express = require('express');
const fs = require('fs');

const validator = require('email-validator');
const randtoken = require('rand-token');

// --------------------- Middleware ---------------------
const validateAgeMiddleware = require('./middlewares/validateAge');
const validateTokenMiddleware = require('./middlewares/validateToken');
const validateNameMiddleware = require('./middlewares/validateName');
const validateDateMiddleware = require('./middlewares/validateDate');
const validateDateFormateMiddleware = require('./middlewares/validateDateFormate');
const validateRateRangeMiddleware = require('./middlewares/validateRateRange');

const app = express();
const SUCCESS = 200;
const PORT = 3000;
const PATH = './crush.json';
const CRUSHIDPATH = '/crush/:id';
// não remova esse endpoint, e para o avaliador funcionar
app.use(express.json());
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});
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
app.get(CRUSHIDPATH, (request, response) => {
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
    return response.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  response.status(200).json({ token });
});

// --------------------- REQ 6 ---------------------
app.use(validateTokenMiddleware);
app.delete(CRUSHIDPATH, (request, response) => {
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
app.use(validateAgeMiddleware);
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
app.put(CRUSHIDPATH, (request, response) => {
  const { id } = request.params;
  const { name, age, date } = request.body;
  const data = JSON.parse(fs.readFileSync(PATH));
  const newData = data.filter((item) => item.id !== Number(id));
  newData.push({ id: Number(id), name, age, date });
  fs.writeFileSync(PATH, JSON.stringify(newData, null, 2));
  response.status(200).send(newData[Number(id) - 1]);
});

app.listen(PORT, () => {
  console.log(`Aplicação rodando na porta ${PORT}`);
});
