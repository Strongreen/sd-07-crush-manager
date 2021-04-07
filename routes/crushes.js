const express = require('express');
const fs = require('fs');
const middlewaresTokens = require('../middlewares/middlewaresTokens');

const app = express();

app.get('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync(`${__dirname}/../crush.json`, 'utf8'));
  res.status(200).send(data);
});

app.get('/:id', (req, res) => {
  const { id } = req.params;
  const data = JSON.parse(fs.readFileSync(`${__dirname}/../crush.json`, 'utf8'));
  try {
    const crushID = data[id - 1];
    if (!crushID) {
      throw new Error('Crush não encontrado');
    }
    res.status(200).send(crushID);
  } catch (error) {
    res.status(404).send({
      message: error.message,
    });
  }
});

async function validateName(name) {
  if (!name) throw new Error('O campo "name" é obrigatório');
  if (name.length < 3) throw new Error('O "name" deve ter pelo menos 3 caracteres');
}

async function validateAge(age) {
  if (!age) throw new Error('O campo "age" é obrigatório');
  if (age < 18) throw new Error('O crush deve ser maior de idade');
}

function verifyCorretDate(date) {
  if (!date) {
    throw new Error('O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
  }
  const reForDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  if (!reForDate.test(date)) throw new Error('O campo "datedAt" deve ter o formato "dd/mm/aaaa"');
}

function validateDate(date) {
  if (!date || date.rate === undefined) {
    throw new Error('O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
  }
  verifyCorretDate(date.datedAt);
  if (date.rate < 1 || date.rate > 5) {
    throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');
  }
}

function readCrushDataBase() {
  return JSON.parse(fs.readFileSync(`${__dirname}/../crush.json`, 'utf8'));
}

function writeCrushDataBase(crush) {
  fs.promises.writeFile(`${__dirname}/crush.json`, JSON.stringify(crush));
}

app.use(middlewaresTokens);

app.post('/', async (req, res) => {
  const { name, age, date } = req.body;
  try {
    await validateName(name);
    await validateAge(age);
    validateDate(date);
    const data = await readCrushDataBase();
    const size = data.length;
    const newCrush = { name, id: size + 1, age, date };
    data.push(newCrush);
    await writeCrushDataBase(data);
    res.status(201).send(newCrush);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.put('/:id', async (req, res) => {
  const { name, age, date } = req.body;
  const { id } = req.params;
  try {
    await validateName(name);
    await validateAge(age);
    validateDate(date);
    const data = await readCrushDataBase();
    data[id - 1] = {
      name,
      id: parseInt(id, 10),
      age,
      date,
    };
    await writeCrushDataBase(data);
    res.status(200).send(data[id - 1]);
  } catch (error) { res.status(400).send({ message: error.message }); }
});

app.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await readCrushDataBase();
    data.splice(id - 1, 1);
    await writeCrushDataBase(data);
    res.status(200).send({ message: 'Crush deletado com sucesso' });
  } catch (error) {
    res.status(400).send({ message: error.message }); 
  }
});

module.exports = app;
