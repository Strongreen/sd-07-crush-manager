const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const authMiddleware = require('./authMiddleware');
const nameMiddleware = require('./nameMiddleware');
const ageMiddleware = require('./ageMiddleware');
const dateMiddleware = require('./dateMiddleware');
const dateFormatMiddleware = require('./dateFormatMiddleware');

const app = express();
const SUCCESS = 200;
const crushId = '/crush/:id';
const crushFile = 'crush.json';

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

const requestdata = () => JSON.parse(fs.readFileSync(crushFile));

app.get('/crush', (req, res) => {
  const data = requestdata();
  res.status(200).send(data);
});

const validEmail = (emailregex) => {
  const validate = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return validate.test(emailregex);
};

const genRanHex = (size) =>
      [...Array(size)]
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join(''); // https://stackoverflow.com/questions/58325771/how-to-generate-random-hex-string-in-javascript

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  if (!validEmail(email)) {
 return res
      .status(400)
      .send({ message: 'O "email" deve ter o formato "email@email.com"' }); 
}
  if (!password) {
 return res
      .status(400)
      .send({ message: 'O campo "password" é obrigatório' }); 
}
  if (password.length < 6) {
    return res
      .status(400)
      .send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
    res.status(200).send({ token: genRanHex(16) });
});
  /*   !date.rate === true se
  1) date.rate === undefined
  2) date.rate === ''
  3) date.rate === NaN
  4) date.rate === null
  5) date.rate === 0
  6) date.rate === false */
app.post('/crush', authMiddleware);
app.post('/crush', nameMiddleware);
app.post('/crush', ageMiddleware);
app.post('/crush', dateMiddleware);
app.post('/crush', dateFormatMiddleware);
app.post('/crush', (req, res) => {
  const { name, age, date } = req.body;
  // http://jsfiddle.net/bruscopelliti/EZVdg/
  if (date.rate < 1 || date.rate > 5) {
    return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  const crushs = JSON.parse(fs.readFileSync(crushFile));
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
  fs.promises.writeFile(`${__dirname}/${crushFile}`, JSON.stringify(crushs));
  res.status(201).send(newCrush);
});

app.get('/crush/search', authMiddleware, (req, res) => {
  const { q } = req.query;
  const crushs = requestdata();
  console.log(crushs);
  const filterCrush = crushs.filter((e) => e.name.indexOf(q) > -1);
  console.log(req.query);
  console.log(q);
  // console.log(crushs);
  console.log(filterCrush);
  res.status(200).send(filterCrush);
});

app.put(crushId, authMiddleware);
app.put(crushId, nameMiddleware);
app.put(crushId, ageMiddleware);
app.put(crushId, dateMiddleware);
app.put(crushId, dateFormatMiddleware);
app.put(crushId, (req, res) => {
  const { name, age, date } = req.body;
  const id = Number(req.params.id);
  // http://jsfiddle.net/bruscopelliti/EZVdg/
  if (date.rate < 1 || date.rate > 5) {
    return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  const crushs = JSON.parse(fs.readFileSync(crushFile));
  const newCrush = {
    name,
    age,
    id,
    date: {
      datedAt: date.datedAt,
      rate: date.rate,
    },
  };
  crushs[id - 1] = newCrush;
  res.status(200).send(newCrush);
});

app.delete(crushId, authMiddleware);
app.delete(crushId, (req, res) => {
  const crushs = JSON.parse(fs.readFileSync(crushFile));
  const id = Number(req.params.id);
  crushs.splice(id - 1, 1);
  res.status(200).send({ message: 'Crush deletado com sucesso' });
});

app.get('/crush/:id', (req, res) => {
  const { id } = req.params;
  const data = requestdata();
  const dataFilter = data.find((e) => e.id === parseFloat(id));
  if (!dataFilter) return res.status(404).send({ message: 'Crush não encontrado' });
  res.status(200).send(dataFilter);
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
