const express = require('express');
const fs = require('fs');
const rescue = require('express-rescue');
const generateToken = require('./generateToken');
const validateLoginMiddleware = require('./middlewares/ValidateLoginMiddleware');
const validateCrush = require('./middlewares/validateCrush');
const validateToken = require('./middlewares/validateToken');

const app = express();
const SUCCESS = 200;
const SUCCESS_POST = 201;
const FAILURE = 400;
const NOT_FOUND = 404;
const FILE_PATH = './crush.json';
const CRUSH_SEED = '/crush';

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get(`${CRUSH_SEED}/search`, validateToken, rescue(async (request, response) => {
  const crushData = JSON.parse(await fs.promises.readFile(FILE_PATH, 'utf8'));
  const result = crushData.filter((crush) => crush.name.includes(request.query.q));

  response.status(SUCCESS).send(result);
}));

app.get(CRUSH_SEED, rescue(async (_request, response) => {
  const crushData = JSON.parse(await fs.promises.readFile(FILE_PATH, 'utf8'));

  response.status(SUCCESS).json(crushData);
}));

app.post(CRUSH_SEED, validateToken, validateCrush, rescue(async (request, response) => {
  const crushData = JSON.parse(await fs.promises.readFile(FILE_PATH, 'utf8'));
  const size = crushData.length;

  crushData[size] = {
    id: size + 1,
    ...request.body,
  };

  await fs.promises.writeFile('./crush.json', JSON.stringify(crushData));

  response.status(SUCCESS_POST).send(crushData[size]);
}));

app.get(`${CRUSH_SEED}/:id`, rescue(async (request, response) => {
  const crushData = JSON.parse(await fs.promises.readFile(FILE_PATH, 'utf8'));
  const { id } = request.params;

  const crushWithId = crushData.find((crush) => crush.id === Number(id));

  if (crushWithId) {
    response.status(SUCCESS).json(crushWithId);
  } else {
    response.status(NOT_FOUND).json({ message: 'Crush não encontrado' });
  }
}));

app.post('/login', validateLoginMiddleware, rescue(async (request, response) => {
  const token = generateToken();
  request.headers.Authorization = token;

  response.status(SUCCESS).json(token);
}));

app.put(`${CRUSH_SEED}/:id`, validateToken, validateCrush, rescue(async (request, response) => {
  const crushData = JSON.parse(await fs.promises.readFile(FILE_PATH, 'utf8'));
  const { id } = request.params;
  const { name, age, date } = request.body;

  crushData[id - 1] = {
    id: crushData[id - 1].id,
    name,
    age,
    date: {
      datedAt: date.datedAt,
      rate: date.rate,
    },
  };

  await fs.promises.writeFile(FILE_PATH, JSON.stringify(crushData));

  response.status(SUCCESS).json(crushData[id - 1]);
}));

app.delete(`${CRUSH_SEED}/:id`, validateToken, rescue(async (request, response) => {
  const crushData = JSON.parse(await fs.promises.readFile(FILE_PATH, 'utf8'));
  const newData = crushData.filter((crush) => crush.id !== request.params.id);

  await fs.promises.writeFile(FILE_PATH, JSON.stringify(newData));

  response.status(SUCCESS).json({ message: 'Crush deletado com sucesso' });
}));

app.use((error, _request, response, _next) => {
  response.status(FAILURE).json({ message: error.message });
});

app.listen(3000, () => {
  console.log('listen on port 3000');
});
