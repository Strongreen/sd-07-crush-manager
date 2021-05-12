const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');
const rescue = require('express-rescue');
const { middlewareLogin, writeFile } = require('./middlewares/middlewareLogin');
const { middlewareNameTest } = require('./middlewares/middlewareNameTest');
const { middlewareAgeTest } = require('./middlewares/middlewareAgeTest');
const { middlewareDateTest } = require('./middlewares/middlewareDateTest');
const { middlewareDatedAtTest } = require('./middlewares/middlewareDatedAtTest');
const { middlewareRateTest } = require('./middlewares/middlewareRateTest');

const validatorEmail = /^\S+@\S+\.\S+$/;

const fileCrushs = './crush.json';

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

const emailTests = (email) => {
  if (email === undefined) {
    const error = { message: 'O campo "email" é obrigatório' };
    return error;
  } if (!validatorEmail.test(email)) {
    const error = { message: 'O "email" deve ter o formato "email@email.com"' };
    return error;
  }
  return undefined;
};

const passwordTests = (password) => {
  if (password === undefined) {
    const error = { message: 'O campo "password" é obrigatório' };
    return error;
  } if (password.length < 6) {
    const error = { message: 'A "senha" deve ter pelo menos 6 caracteres' };
    return error;
  }
  return undefined;
};

const rota = '/crush/:id';

// 1
app.get('/crush', (req, res) => {
  const crushs = JSON.parse(fs.readFileSync(fileCrushs), 'utf-8');  
  res.status(SUCCESS).send(crushs);
});

app.get('/crush/search', middlewareLogin, (req, res) => { // 7
  const crushs = JSON.parse(fs.readFileSync(fileCrushs), 'utf-8');
  const { q } = req.query;

  if (q === undefined) {
    return res.status(SUCCESS).send([]);
  } if (q === '') {
    return res.status(SUCCESS).send(crushs);
  }

  const crushContains = crushs.filter((element) => element.name.includes(q));

  return res.status(SUCCESS).send(crushContains);
});

// 2
app.get(rota, (req, res) => {
  const crushs = JSON.parse(fs.readFileSync(fileCrushs), 'utf-8');  
  const { id } = req.params;
  const crushId = crushs.find((element) => element.id === parseInt(id, 10));

  if (crushId) {
    res.status(SUCCESS).send(crushId);
  }

  res.status(404).send(
    { message: 'Crush não encontrado' },
  );
});

app.post('/login', (req, res) => { // 3
  const { email, password } = req.body;
  const resultEmailTest = emailTests(email);
  if (resultEmailTest) {
    return res.status(400).send(resultEmailTest);
  }

  const resultPasswordTest = passwordTests(password);
  if (resultPasswordTest) {
    return res.status(400).send(resultPasswordTest);
  }

  const token = crypto.randomBytes(8).toString('hex');
  return res.status(SUCCESS).send({ token });
});

app.post( // 4
  '/crush',
  middlewareLogin,
  middlewareNameTest,
  middlewareAgeTest,
  middlewareDateTest,
  middlewareDatedAtTest,
  middlewareRateTest,
  async (req, res) => {
    const { name, age, date } = req.body;
    const oldCrushs = JSON.parse(fs.readFileSync(fileCrushs), 'utf-8'); 
    const id = oldCrushs.length + 1;
    const newArrayOfCrushs = [...oldCrushs, { id, name, age, date }];
    await writeFile(newArrayOfCrushs);
    return res.status(201).send({ id, name, age, date });
  },
);

app.put( // 5
  rota,
  middlewareLogin,
  middlewareNameTest,
  middlewareAgeTest,
  middlewareDateTest,
  middlewareDatedAtTest,
  middlewareRateTest,
  rescue((req, res) => {
    const crushs = JSON.parse(fs.readFileSync(`${__dirname}/crush.json`, 'utf8'));
    const { name, age, date } = req.body;
    const { id } = req.params;
    const key = parseInt(id, 0) - 1;
    try {
      crushs[key] = { name, id: parseInt(id, 0), age, date }; 
      fs.promises.writeFile(`${__dirname}/crush.json`, JSON.stringify(crushs));
      return (
        res.status(200).send({ id: crushs[key].id,
        name: crushs[key].name,
        age: crushs[key].age,
        date: crushs[key].date })
      );
    } catch (error) {
      return res.status(400).send({ message: error.message }); 
    }
  }),
);

app.delete(rota, middlewareLogin, async (req, res) => { // 6
  const crushs = JSON.parse(fs.readFileSync(fileCrushs), 'utf-8'); 
  const { id } = req.params;
  const newCrushFiltered = crushs.filter((element) => element.id !== parseInt(id, 10));

  await writeFile(newCrushFiltered);

  return res.status(SUCCESS).send({ message: 'Crush deletado com sucesso' });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(PORT, () => { console.log('Online'); });
