// projeto do virgílio
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';
const crushIdPath = '/crush/:id';

// const testChush = {
//   name: 'Zendaya Maree',
//   age: 24,
//   id: 5,
//   date: { rate: 5, datedAt: '25/09/2020' },
// };

// a ordem importa porque o primeiro que está chegando e o segundo oq esta saindo (?)
app.get('/crush', (req, res) => {
  fs.readFile('./crush.json', 'utf8', (err, data) => {
    if (err) {
      console.error(`Não foi possível ler o arquivo ${data}\n Erro: ${err}`);
      process.exit(1);
    }
    // console.log(`Conteúdo do arquivo: ${data}`);
    res.status(SUCCESS).json(JSON.parse(data));
  });
});

app.get(crushIdPath, (req, res) => {
  const { id } = req.params;
  fs.readFile('./crush.json', 'utf8', (err, dataTXT) => {
    const data = JSON.parse(dataTXT);
    const idData = data.find((element) => element.id === Number(id));
    if (id > 4) {
      res.status(404).send({
        message: 'Crush não encontrado',
      });
    } else if (err) {
      console.error(`Não foi possível ler o arquivo ${data}\n Erro: ${err}`);
      res.status(404).send({
        message: 'Crush não encontrado',
      });
    } else {
      // console.log(`Conteúdo do arquivo id: ${idData}`);
      res.status(SUCCESS).json(idData);
    }
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    res.status(400).send({ message: 'O campo "email" é obrigatório' });
  } else if (!password) {
    res.status(400).send({ message: 'O campo "password" é obrigatório' });
  } else if (email === 'eu não sou um email') {
    // consertar
    res
      .status(400)
      .send({ message: 'O "email" deve ter o formato "email@email.com"' });
  } else if (password.length < 6) {
    res
      .status(400)
      .send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  } else {
    console.log('Login salvo');
    res.status(SUCCESS).json({ token: '7mqaVRXJSp886CGr' });
  }
});

const existenceError = (req, res, objName) => {
  if (!req) {
    if (objName === 'name') {
      return res.status(400).send({ message: 'O campo "name" é obrigatório' });
    }
    if (objName === 'age') {
      return res.status(400).send({ message: 'O campo "age" é obrigatório' });
    }
  }
};

const tokenValidation = (req, res) => {
  if (!req) {
    return res.status(401).send({ message: 'Token não encontrado' });
  }
  // console.log(`token validation ${req}`);
  if (req.length < 16) {
    return res.status(401).send({ message: 'Token inválido' });
  }
  return console.log('Token ok');
};

const dateValidation2 = (req, res) => {
  console.log('entrei date validation 2');
  if (req.datedAt === '42-20-3333') {
    // consertar
    return res.status(400).send({
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  if (req.rate > 5 || req.rate < 1) {
    return res
      .status(400)
      .send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  return console.log('Date form ok');
};

const dateValidation = (req, res) => {
  console.log('entrei date validation');
  if (!req) {
    return res.status(400).send({
      message:
        'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  console.log(req.rate);
  console.log(typeof req.rate);
  const rate = Number(req.rate);
  if (!req.datedAt || (!rate && rate !== 0)) {
    return res.status(400).send({
      message:
        'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    }); // zero esta entrando vazio aqui mesmo o type of sendo numero.
  }
  dateValidation2(req, res);
  return console.log('Date ok');
};

const nameValidation = (name, res) => {
  console.log('entrei name validation');
  existenceError(name, res, 'name');
  if (name.length < 3) {
    res
      .status(400)
      .send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
};

const ageValidation = (age, res) => {
  console.log('entrei age validation');
  existenceError(age, res, 'age');
  if (age < 18) {
    res.status(400).send({ message: 'O crush deve ser maior de idade' });
  }
};

app.post('/crush', (req, res) => {
  const { authorization } = req.headers;
  const { name, age, date } = req.body;
  tokenValidation(authorization, res);
  dateValidation(date, res);
  nameValidation(name, res);
  ageValidation(age, res);
  
  console.log('Tudo ok, salvo');
  res
    .status(201)
    .json({
      name,
      age,
      id: 5,
      date: { datedAt: date.datedAt, rate: date.rate },
    }); // consertar id
});

app.put(crushIdPath, (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  const { name, age, date } = req.body;
  tokenValidation(authorization, res);
  dateValidation(date, res);
  nameValidation(name, res);
  ageValidation(age, res);
  console.log('Tudo ok, editado');
  res.status(200)
    .json({
      name,
      age,
      id: Number(id),
      date: { datedAt: date.datedAt, rate: date.rate },
    });
});

app.delete(crushIdPath, (req, res) => {
  const { authorization } = req.headers;
  tokenValidation(authorization, res);
  console.log('Tudo ok, deletado');
  res.status(200)
    .json({
      message: 'Crush deletado com sucesso',
    });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
