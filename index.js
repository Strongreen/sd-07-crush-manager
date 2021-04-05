const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const randtoken = require('rand-token');
const validator = require('email-validator');
// const rescue = require('express-rescue');

const app = express();
app.use(express.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (req, res) => {
  const crush = await fs.readFile(
    path.join(__dirname, '.', 'crush.json'),
    'utf-8',
  );
  const readCrush = JSON.parse(crush);
  if (readCrush.length > 0) {
    res.status(SUCCESS).json(readCrush);
  }
  res.status(SUCCESS).json([]);
});

app.get('/crush/:id', async (req, res) => {
  const { id } = req.params;
  const crush = await fs.readFile(
    path.join(__dirname, '.', 'crush.json'),
    'utf-8',
  );
  const jsonCrush = JSON.parse(crush);
  const findId = jsonCrush.find((star) => star.id === parseInt(id, 10));
  if (findId == null) {
    res.status(404).json({ message: 'Crush não encontrado' });
  }
  res.status(SUCCESS).json(findId);
});

app.post('/login', (req, res) => {
  const token = randtoken.generate(16);
  const { email, password } = req.body;
  const validatorEmail = validator.validate(email);
  if (!email) {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validatorEmail) {
    res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  if (!password) {
    res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  res.status(SUCCESS).json({ token });
});

app.listen(PORT, () => { console.log('Online'); });
