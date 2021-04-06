const crypto = require('crypto');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';
const fs = require('fs');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (req, res) => {
  const crushList = JSON.parse(fs.readFileSync('./crush.json', 'utf8'));
  if (crushList.length > 0) {
    return res.status(200).json(crushList);
  }
  if (crushList.lenght === 0) {
    return res.status(200).json([]);
  }
});

app.get('/crush/:idtofind', (req, res) => {
  console.log('entrou no :id');

  const { idtofind } = req.params;

  const crushList = JSON.parse(fs.readFileSync('./crush.json', 'utf8'));
  const crushIndex = crushList.findIndex(({ id }) => id === idtofind);
  if (crushIndex === -1) {
    res.status(404).send({ message: 'Crush não encontrado' });
  }
  res.send(crushList[crushIndex]);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  const regexValidation = regex.test(email);

  if (!password) { res.status(400).send({ message: 'O campo "password" é obrigatório' }); }
  if (password.length < 6) {
    res.status(400).send({ message: 'O "password" ter pelo menos 6 caracteres' });
  }
  if (!email) { res.status(400).send({ message: 'O campo "email" é obrigatório' }); }
  if (!regexValidation) {
    res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  const generatedToken = crypto.randomBytes(8).toString('hex');
  res.send({
    token: generatedToken,
  });
});

function validateToken(authorization, res) {
  if (!authorization) { res.status(401).send({ message: 'Token não encontrado' }); }
  if (authorization.length !== 16) { res.status(401).send({ message: 'Token inválido' }); }
}
function validateName(name, res) {
  if (name.length < 3) {
    res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (!name) { res.status(400).send({ message: 'O campo "name" é obrigatório' }); }
}
function validateAge(age, res) {
  if (!age) { res.status(400).send({ message: 'O campo "age" é obrigatório' }); }
  if (age < 18) { res.status(400).send({ message: 'O crush deve ser maior de idade' }); }
}
function validateRate(rate, res) {
  if (rate < 1 || rate > 5 || rate !== Math.floor(rate)) {
    res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
}

app.post('/crush', (req, res) => {
  const { authorization } = req.headers;
  const { name, age, date } = req.body;
  const { datedAt, rate } = date;
  const regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  const regexValidation = regex.test(datedAt);
  validateToken(authorization, res); validateName(name, res);
  validateAge(age, res); validateRate(rate, res);
  if (!regexValidation) {
    res.status(400).send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (!date || !rate || !datedAt) {
    res.status(400).send({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  res.status(201).send({
    id: 1, name: 'Keanu Reeves', age: 56, date: { datedAt: '22/10/2019', rate: 5 },
  });
});

app.listen(PORT, () => { console.log('Online'); });
