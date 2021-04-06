const express = require('express');

const fs = require('fs').promises;

const token = require('../middlewares/tokenMiddleware');

const app = express();

const empty = [];

const notFound = {
  "message": "Crush não encontrado"
};

const getData = async () => {
  try {
    return JSON.parse(await fs.readFile(`${__dirname}/../crush.json`, 'utf8'));
  } catch (error) {
    throw new Error(error);
  }
}

const checkName = (name) => {
  if (!name) throw new Error('O campo "name" é obrigatório');
  else if (name.length < 3) throw new Error('O "name" deve ter pelo menos 3 caracteres');
};

const checkAge = (age) => {
  if (!age) throw new Error('O campo "age" é obrigatório');
  else if (age < 18) throw new Error('O crush deve ser maior de idade');
}

const checkDateFields = (datedAt, rate) => {
  if (!datedAt || !rate) throw new Error('O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
}

const checkDate = (date) => {
  const regexForDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  if (date === {} || date === undefined) throw new Error('O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
  else checkDateFields(date.datedAt, date.rate);

  if (!regexForDate.test(date.datedAt)) throw new Error('O campo "datedAt" deve ter o formato "dd/mm/aaaa"');
  if (date.rate < 1 || date.rate > 5)
    throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');
}

const updateCrushes = async (name, age, date) => {
  const data = await getData();

  const newCrush = {
    id: data.length + 1,
    name,
    age,
    date
  };
 
  data.push(newCrush);
  await fs.writeFile(`${__dirname}/../crush.json`, JSON.stringify(data));
  return newCrush;
}

app.get('/', async (_request, response) => {
  const data = await getData();
  if (data.length == 0) return response.status(200).send(empty);
  return response.status(200).send(await getData());
});

app.get('/:id', async (request, response) => {
  const { id } = request.params;
  const data = await getData();
  const crushFound = data.find((crush) => crush.id === Number(id));
  if (!crushFound) return response.status(404).send(notFound);
  return response.status(200).send(crushFound);
});

app.use(token);

app.post('/', async (request, response) => {
  const { name, age, date } = request.body;
  try {
    checkName(name);
    checkAge(age);
    checkDate(date);
  } catch (error) {
    return response.status(400).send({
      "message": error.message,
    });
  }

  const newCrush = await updateCrushes(name, age, date);
  response.status(201).send(newCrush);
});

module.exports = app;
