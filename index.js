const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const SUCCESS = 200;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

const requestdata = () => JSON.parse(fs.readFileSync('crush.json'));

app.get('/crush', (req, res) => {
  const data = requestdata();
  res.status(200).send(data);
});

app.get('/crush/:id', (req, res) => {
  const { id } = req.params;
  const data = requestdata();
  const dataFilter = data.find((e) => e.id === parseFloat(id));
  if (!dataFilter) return res.status(404).send({ message: 'Crush não encontrado' });
  res.status(200).send(dataFilter);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === undefined || email === '') {
    res.status(400).send({ message: 'O campo "email" é obrigatório' });
  } else {
    const validEmail = (emailregex) => {
      const validate = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return validate.test(emailregex);
    };
    if (!validEmail(email)) {
      res
        .status(400)
        .send({ message: 'O "email" deve ter o formato "email@email.com"' });
    } else if (password === undefined || password === '') {
      res.status(400).send({ message: 'O campo "password" é obrigatório' });
    } else if (password.length < 6) {
      res
        .status(400)
        .send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
    } else {
      const genRanHex = (size) =>
        [...Array(size)]
          .map(() => Math.floor(Math.random() * 16).toString(16))
          .join(''); // https://stackoverflow.com/questions/58325771/how-to-generate-random-hex-string-in-javascript
      res.status(200).send({ token: genRanHex(16) });
    }
  }
});

app.post('/crush', (req, res) => {
  if (req.headers.authorization === undefined || req.headers.authorization === '') return res.status(401).send({ message: 'Token não encontrado' });
  if (req.headers.authorization.length !== 16) return res.status(401).send({ message: 'Token inválido' });

  const { name, age, date } = req.body;
  if (name === undefined || name === '') return res.status(400).send({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  if (age === undefined || age === '') return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  if (age < 18) return res.status(400).send({ message: 'O crush deve ser maior de idade' });

  /*   !date.rate === true se
  1) date.rate === undefined
  2) date.rate === ''
  3) date.rate === NaN
  4) date.rate === null
  5) date.rate === 0
  6) date.rate === false */

  if (!date || !date.datedAt || !date.rate) return res.status(400).send({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });

  // http://jsfiddle.net/bruscopelliti/EZVdg/
  const regex = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
  const dataValidation = regex.test(date.datedAt);

  if (!dataValidation) return res.status(400).send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  if (date.rate < 1 || date.rate > 5) return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });

  const crushs = JSON.parse(fs.readFileSync('crush.json'));

  const newCrush = {
    name,
    age,
    id: crushs.length + 1,
    date: {
      datedAt: date.datedAt,
      rate: date.rate,
    },
  };
  crushs.push(newCrush);
  console.log(crushs);
  res.status(201).send(newCrush);
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
