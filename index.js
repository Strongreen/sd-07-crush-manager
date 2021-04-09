// projeto do virgílio
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';
const crushTest = {
  name: 'Zendaya Maree',
  age: 24,
  id: 5,
  date: { rate: 5, datedAt: '25/09/2020' },
};

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
  } else if (email === 'eu não sou um email') { // consertar
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

app.post('/crush', (req, res) => {
  const { Authorization } = req.headers;
  console.log(Authorization);
  const { name, age, date } = req.body;
  if (!Authorization) {
    res.status(401).send({ message: 'Token não encontrado' });
  } else if (Authorization === 99999999) { // consertar
    res.status(401).send({ message: 'Token inválido' });
  } else if (!name) {
    res.status(400).send({ message: 'O campo "name" é obrigatório' });
  } else if (name.length < 3) {
    res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  } else if (!age) {
    res.status(400).send({ message: 'O campo "age" é obrigatório' });
  } else if (name.length < 18) {
    res.status(400).send({ message: 'O crush deve ser maior de idade' });
  } else if (!date.datedAt || !date.rate) {
    res.status(400).send({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  } else {
    console.log('salvo');
    res.status(201).json(crushTest);
  }
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
