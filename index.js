const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');
const tokenMiddleware = require('./middleware/tokenMiddleware');
const dateMiddleware = require('./middleware/dateMiddleware');
const reqBodyMiddleware = require('./middleware/reqBodyMiddleware');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const BAD_REQUEST = 400;
const CREATED = 201;
const NOT_FOUND = 404;
const PORT = '3000';

const getCrush = async () => {
  const content = await fs.promises.readFile('./crush.json', 'utf-8');
  const data = await JSON.parse(content);
  return data;
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (_request, response) => {
  try {
    const data = await getCrush();
    response.status(SUCCESS).send(data);
  } catch (error) { console.error(`Erro: ${error.message}`); }
});

app.get('/crush/:id', async (request, response) => {
  const { id } = (request.params);
  try {
    const data = await getCrush();
    const findCrush = data.find((crush) => crush.id === Number(id));
    if (!findCrush) {
      return response.status(NOT_FOUND).send({ message: 'Crush não encontrado' });
    }
    response.status(SUCCESS).send(findCrush);
  } catch (error) {
    console.error(`Erro: ${error.message}`);
    response.status(NOT_FOUND).send({ message: 'Crush não encontrado' });
  }
});

const erroEmail = {
  INVALID: 'O "email" deve ter o formato "email@email.com"',
  NULL: 'O campo "email" é obrigatório',
};

const erroPass = {
  NULL: 'O campo "password" é obrigatório',
  INVALID: 'A "senha" deve ter pelo menos 6 caracteres',
};
const regex = {
  EMAIL: /^([a-zA-Z0-9_-]+)@+\w+.com/,
};

app.post('/login', (request, res) => {
  const { email, password } = request.body;
  const { EMAIL } = regex;
    if (!email) return res.status(BAD_REQUEST).json({ message: erroEmail.NULL }); 
    if (!EMAIL.test(email)) return res.status(BAD_REQUEST).json({ message: erroEmail.INVALID });

    if (!password) return res.status(BAD_REQUEST).json({ message: erroPass.NULL });
    if (password.length < 6) return res.status(BAD_REQUEST).json({ message: erroPass.INVALID });

    const token = crypto.randomBytes(8).toString('hex');
    return res.status(SUCCESS).json({ token });
});

app.use(tokenMiddleware);
app.use(reqBodyMiddleware);
app.use(dateMiddleware);

app.post('/crush', async (request, response) => {
  const { name, age, date } = request.body;
  try {
    const data = await getCrush();
    const newCrush = {
      id: `${data.length + 1}`,
      name,
      age,
      date,
    };
    const newList = { ...data, newCrush };
    await fs.promises.writeFile(`${__dirname}/.././crush.json`, JSON.stringify(newList));
    return response.status(CREATED).send(newCrush);
  } catch (error) { console.error(`Erro: ${error.message}`); }
});

app.listen(PORT, () => { console.log('Online'); });