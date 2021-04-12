const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const functions = require('./functions');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';
const crushPath = './crush.json';
const urlCrushId = '/crush/:id';

const {
  generateToken,
  validateEmail,
  validatePassword,
  validateToken,
  createCrush,
  editCrush,
  deleteCrush,
  searchCrush,
} = functions;

const tokenMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    validateToken(authorization);
  } catch (err) {
    res.status(401).send({
      message: err.message,
    });
    return;
  }
  next();
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (req, res) => {
  const data = JSON.parse(fs.readFileSync(crushPath, 'utf8'));
  res.status(SUCCESS).send(data);
});

app.get('/crush/search', tokenMiddleware, (req, res) => {
  const query = req.query.q;
  searchCrush(query);
  const crushes = JSON.parse(fs.readFileSync(crushPath, 'utf8'));
  res.status(200).send(crushes);
});

app.get(urlCrushId, (req, res) => {
  const data = JSON.parse(fs.readFileSync(crushPath, 'utf8'));
  const id = parseInt(req.params.id, 10);
  const crushId = data.filter((crush) => crush.id === id);
  if (crushId.length === 0) {
    res.status(404).send({
      message: 'Crush não encontrado',
    });
  }
  res.status(SUCCESS).send(crushId[0]);
});

app.put(urlCrushId, tokenMiddleware, (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;
    const edited = editCrush(body, id);
    res.status(200).send(edited);
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});

app.delete(urlCrushId, tokenMiddleware, (req, res) => {
  const { id } = req.params;
  deleteCrush(id);
  res.status(200).send({ message: 'Crush deletado com sucesso' });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  try {
    validateEmail(email);
    validatePassword(password);
    res.status(200).send({
      token: generateToken(16),
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});

app.post('/crush', tokenMiddleware, (req, res) => {
  try {
    const { body } = req;
    const newCrush = createCrush(body);
    res.status(201).send(newCrush);
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
