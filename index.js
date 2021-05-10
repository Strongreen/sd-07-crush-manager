const express = require('express');
const bodyParser = require('body-parser');
// const fs = require('fs');
const emailValidator = require('./_helpers/emailValidator.js');
const generateToken = require('./_helpers/generateToken.js');
const passwordValidator = require('./_helpers/passwordValidator.js');
const readFilesPromise = require('./_helpers/readFilesPromise.js');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';
const PATH = './crush.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// requirement 1
app.get('/crush', (req, res) => {
  readFilesPromise(PATH)
    .then((resolve) => res.status(200).send(resolve))
    .catch(() => res.status(200).send());
});

// requirement 2
app.get('/crush/:id', (req, res) => {
  const { id: idCrush } = req.params;
  readFilesPromise(PATH)
    .then((resolve) => {
      const crush = resolve.find(({ id }) => id === parseInt(idCrush, 10));
      if (!crush) res.status(404).send({ message: 'Crush não encontrado' });
      res.status(200).send(crush);
    })
    .catch(() => res.status(404).send({ message: 'Crush não encontrado' }));
});

// requirement 3
app.post('/login', (req, res) => {
  const token = generateToken();
  const { email, password } = req.body;
  const { statusEmail, messageEmail } = emailValidator(email);
  const { statusPass, messagePass } = passwordValidator(password);
  if (!statusEmail) {
    res.status(400).send(messageEmail);
  }
  if (!statusPass) {
    res.status(400).send(messagePass);
  }
  res.status(200).send(token);
});

app.listen(PORT, () => { console.log('Online'); });
