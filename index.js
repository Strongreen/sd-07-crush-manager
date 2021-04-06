const express = require('express');
const fs = require('fs');
const functions = require('./functions');

const {
  validaToken,
  validarEmail,
  validarSenha,
  gerarToken,
  validaRegras,
} = functions;
const app = express();
const SUCCESS = 200;
const jsonPath = './crush.json';
const crushIdPath = '/crush/:id';

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// REQUISITO 1
app.get('/crush', (req, res) => {
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  if (data.length > 0) {
    res.status(200).send(data);
  } else {
    res.status(200).send([]);
  }
});

// REQUISITO 7
app.get('/crush/search', (req, res) => {
  const token = req.headers.authorization;
  if (validaToken(token) !== 'OK') {
    res.status(401).send({ message: validaToken(token) });
    return;
  }
  const termo = req.query.q;
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const newData = [];
  for (let i = 0; i < data.length; i += 1) {
    if (data[i].name.includes(termo)) {
      newData.push(data[i]);
    }
  }
  res.status(200).send(newData);
});

// REQUISITO 2
app.get(crushIdPath, (req, res) => {
  let { id } = req.params;
  id = parseInt(id, 2);
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  for (let i = 0; i < data.length; i += 1) {
    if (data[i].id === id) {
      res.status(200).send(data[i]);
      return;
    }
  }
  res.status(404).send({
    message: 'Crush não encontrado',
  });
});

// REQUISITO 3
app.post('/login', (req, res) => {
  const { email } = req.body;
  const { password } = req.body;
  validarEmail(email);
  validarSenha(password);
  const token = gerarToken(16);
  res.send({
    token,
  });  
});

// REQUISITO 4
app.post('/crush', (req, res) => {
  const newCrush = req.body;
  const token = req.headers.authorization;
  if (validaToken(token) !== 'OK') {
    res.status(401).send({ message: validaToken(token) });
    return;
  }
  validaRegras(newCrush);
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  let lastId = 0;
  for (let i = 0; i < data.length; i += 1) {
    if (data[i].id > lastId) {
      lastId = data[i].id;
    }
  }
  newCrush.id = lastId + 1;
  data.push(newCrush);
  fs.writeFileSync(jsonPath, JSON.stringify(data));
  res.status(201).send(newCrush);
});

// REQUISITO 5
app.put(crushIdPath, (req, res) => {
  let resData = {};
  const { id } = req.params;
  const newData = req.body;
  const token = req.headers.authorization;
  if (validaToken(token) !== 'OK') {
    res.status(401).send({ message: validaToken(token) });
    return;
  }
  validaRegras(newData);
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  for (let i = 0; i < data.length; i += 1) {
    if (parseInt(id, 0) === data[i].id) {
      Object.assign(data[i], { name: newData.name, age: newData.age, date: newData.date });
      resData = data[i];
    }
  }
  fs.writeFileSync(jsonPath, JSON.stringify(data));
  res.status(200).send(resData);
});

// REQUISITO 6
app.delete(crushIdPath, (req, res) => {
  const token = req.headers.authorization;
  if (validaToken(token) !== 'OK') {
    res.status(401).send({ message: validaToken(token) });
    return;
  }
  const { id } = req.params;
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  for (let i = 0; i < data.length; i += 1) {
    if (data[i].id === parseInt(id, 0)) {
      data.splice(i, 1);
    }
  }
  fs.writeFileSync(jsonPath, JSON.stringify(data));
  res.status(200).send({ message: 'Crush deletado com sucesso' });
});

/* MIDDLEWARE DE ERRO */
app.use((err, req, res, _next) => {
  res.status(400).json({ message: err.message });
  }); 

app.listen(3000, () => { console.log('Rodando...'); });
