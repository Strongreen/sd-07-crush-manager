const express = require('express');

const fs = require('fs');

const app = express();

const dateErrorMessage = 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';

const fileDataName = './crush.json';

const crushNotFoundMessage = 'Crush não encontrado';

const tokenValidation = (req, res, next) => {
    const token = req.headers.authorization;
    const regex = /([a-zA-Z0-9]){16}$/;
    if (!token) {
        return res.status(401).send({
            message: 'Token não encontrado',
          });
    }
    if (!regex.test(token)) {
        return res.status(401).send({
            message: 'Token inválido',
          });
    }
    next();
};

const nameValidation = (req, res, next) => {
    const { name } = req.body;
    const regex = /([a-zA-Z]){3}/;
    if (!name) {
        return res.status(400).send({
            message: 'O campo "name" é obrigatório',
          });
    }
    if (!regex.test(name)) {
        return res.status(400).send({
            message: 'O "name" deve ter pelo menos 3 caracteres',
          });
    }
    next();
};

const ageValidation = (req, res, next) => {
    const { age } = req.body;
    if (!age) {
        return res.status(400).send({
            message: 'O campo "age" é obrigatório',
          });
    }
    if (age < 18) {
        return res.status(400).send({
            message: 'O crush deve ser maior de idade',
          });
    }
    next();
};

const dateValidation = (req, res, next) => {
    const { date } = req.body;
    const regex = /(\d{2}\/\d{2}\/\d{4})/;
    if (!date) {
        return res.status(400).send({
            message: dateErrorMessage,
          });
    }
    if (!date.datedAt) {
        return res.status(400).send({
            message: dateErrorMessage,
          });
    }
    if (!regex.test(date.datedAt)) {
        return res.status(400).send({
            message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
          });
    }
    next();
};

const rateValidation = (req, res, next) => {
    const { date } = req.body;
    if (!date.rate) {
        return res.status(400).send({
            message: dateErrorMessage,
          });
    }
    if (!(Number.isInteger(date.rate) && date.rate <= 5 && date.rate >= 1)) {
        return res.status(400).send({
            message: 'O campo "rate" deve ser um inteiro de 1 à 5',
          });
    }
    next();
};

app.get('/', (req, res) => {
  const crushArray = fs.readFileSync(fileDataName, 'utf-8');
  return res.status(200).send(JSON.parse(crushArray));
});

app.get('/search', (req, res) => {
  const crushArray = JSON.parse(fs.readFileSync(fileDataName, 'utf-8'));
  const { q } = req.query;
  const oneCrush = crushArray.filter((crush) => crush.name.includes(q));
  if (oneCrush[0]) {
    return res.status(200).send(oneCrush);
  } 
  return res.status(404).send({
    message: crushNotFoundMessage,
  });
});

app.get('/:id', (req, res) => {
  const crushArray = JSON.parse(fs.readFileSync(fileDataName, 'utf-8'));
  const { id } = req.params;
  const oneCrush = crushArray.filter((crush) => crush.id === parseInt(id, 10));
  if (oneCrush[0]) {
    return res.status(200).send(oneCrush[0]);
  } 
  return res.status(404).send({
    message: crushNotFoundMessage,
  });
});

app.use('/', tokenValidation);

app.use('/', nameValidation);

app.use('/', ageValidation);

app.use('/', dateValidation);

app.use('/', rateValidation);

app.post('/', (req, res) => {
    const newCrush = req.body;
    const crushArray = JSON.parse(fs.readFileSync(fileDataName, 'utf-8'));
    newCrush.id = crushArray.length + 1;
    res.status(201).send(newCrush);
});

app.put('/:id', (req, res) => {
  const crushArray = JSON.parse(fs.readFileSync(fileDataName, 'utf-8'));
  const { id } = req.params;
  const oneCrush = crushArray.filter((crush) => crush.id === parseInt(id, 10));
  if (oneCrush[0]) {
    const crushIndex = crushArray.indexOf(oneCrush[0]);
    crushArray[crushIndex] = {
      id,
      name: req.body.name,
      age: req.body.age,
      date: req.body.date,
    };
    fs.writeFileSync(fileDataName, JSON.stringify(crushArray));
    return res.status(200).send(crushArray[crushIndex]);
  } 
  return res.status(404).send({
    message: crushNotFoundMessage,
  });
});

app.delete('/:id', (req, res) => {
  const crushArray = JSON.parse(fs.readFileSync(fileDataName, 'utf-8'));
  const { id } = req.params;
  const oneCrush = crushArray.filter((crush) => crush.id === parseInt(id, 10));
  if (oneCrush[0]) {
    const crushIndex = crushArray.indexOf(oneCrush[0]);
    crushArray.splice(crushIndex, 1);
    fs.writeFileSync(fileDataName, JSON.stringify(crushArray));
    return res.status(200).send({ message: 'Crush deletado com sucesso' });
  } 
  return res.status(404).send({
    message: crushNotFoundMessage,
  });
});

module.exports = app;
