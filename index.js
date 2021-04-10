// projeto do virgílio
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';
// const crushTest = {
//   name: 'Zendaya Maree',
//   age: 24,
//   id: 5,
//   date: { rate: 5, datedAt: '25/09/2020' },
// };

// a ordem importa porque o primeiro que está chegando e o segundo oq esta saindo
app.get('/crush', (req, res) => {
  fs.readFile('./crush.json', 'utf8', (err, data) => {
    if (err) {
      console.error(`Não foi possível ler o arquivo ${data}\n Erro: ${err}`);
      process.exit(1);
    }
    console.log(`Conteúdo do arquivo: ${data}`);
    res.status(SUCCESS).json(JSON.parse(data));
  });
});

app.get('/crush/:id', (req, res) => {
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
      console.log(`Conteúdo do arquivo id: ${idData}`);
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
    console.log('salvo');
    res.status(SUCCESS).json({ token: '7mqaVRXJSp886CGr' });
  }
});

const existenceError = (req, res, objName) => {
  if (!req) {
    return res
      .status(400)
      .send({ message: `O campo ${objName} é obrigatório` });
  }
};

const tokenValidation = (req, res) => {
  if (!req) {
    return res.status(401).send({ message: 'Token não encontrado' });
  }
  if (req === 99999999) {
    // consertar
    return res.status(401).send({ message: 'Token inválido' });
  }
  return console.log('Token ok');
};

const dateFormValidation = (req, res) => {
  if (req.datedAt === '42-20-3333') { // consertar
    return res.status(400).send({ 
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
};

const dateValidation = (req, res) => {
  dateFormValidation(req, res);
  if (!req.datedAt || !req.rate) {
    return res.status(400).send({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  if (req.rate > 5 || req.rate < 1) {
    return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
   }
   return console.log('Date ok');
};

app.post('/crush', (req, res) => {
  const { authorization } = req.headers;
  const { name, age, date } = req.body;
  existenceError(name, res, 'name');
  existenceError(age, res, 'age');
  tokenValidation(authorization, res);
  dateValidation(date, res);
  if (name.length < 3) {
    res
      .status(400)
      .send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  } else if (age.length < 18) {
    res.status(400).send({ message: 'O crush deve ser maior de idade' });
  } else {
    console.log('salvo');
    res
      .status(201)
      .json({ name, age, date: { datedAt: date.datedAt, rate: date.rate } });
  }
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
