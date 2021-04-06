const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const UNAUTHORIZED = 401;
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

const checkEmailAndPass = (email, password, response) => {
  if (!email) {
    return response.status(BAD_REQUEST).send({ message: 'O campo "email" é obrigatório' });
  }
  if (!/^([a-zA-Z0-9_-]+)@mail\.com$/gm.test(email)) {
    return response.status(BAD_REQUEST).send({ 
      message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return response.status(BAD_REQUEST).send({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return response.status(BAD_REQUEST).send({ message: 'A "senha" ter pelo menos 6 caracteres' });
  }
    const token = crypto.randomBytes(8).toString('hex');
    return response.status(SUCCESS).json({ token });
};

app.post('/login', (request, response) => {
  const { email, password } = request.body;
  try {
    checkEmailAndPass(email, password, response);
  } catch (error) { console.error(`Erro: ${error.message}`); }
});

const checkToken = (token, response) => {
  if (!token) {
    return response.status(UNAUTHORIZED).send({ message: 'Token não encontrado' });
  }
  if (!/^(\d|\w){16}$/gm.test(token)) {
    return response.status(UNAUTHORIZED).send({ message: 'Token inválido' });
  }
};

const checkNameAndAge = (name, age, response) => {
  if (!name) {
    return response.status(BAD_REQUEST).send({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return response.status(BAD_REQUEST).send({ 
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  if (!age) {
    return response.status(BAD_REQUEST).send({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return response.status(BAD_REQUEST).send({ message: 'O crush deve ser maior de idade' });
  }
};

const checkDate = (date, response) => {
  const { datedAt, rate } = date;
  if (!datedAt || !rate) {
    return response.status(BAD_REQUEST).send({
       message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  if (!/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/gm.test(datedAt)) {
    return response.status(BAD_REQUEST).send({ 
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"', 
    });
  }
  if (!/\b[1-5]\b/g.test(rate)) {
    return response.status(BAD_REQUEST).send({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
};

app.post('/crush', async (request, response) => {
  const { authorization: token } = request.header;
  const { name, age, date } = request.body;
  try {
    checkToken(token, response);
    checkNameAndAge(name, age, response);
    checkDate(date, response);
    const data = await getCrush();
    const size = data.length;
    data[size] = {
      id: `${size + 1}`,
      name,
      age,
      date,
    };
    await fs.promises.writeFile(`${__dirname}/.././crush.json`, JSON.stringify(data));
    return response.status(CREATED).send(data[size]);
  } catch (error) { console.error(`Erro: ${error.message}`); }
});

app.listen(PORT, () => { console.log('Online'); });