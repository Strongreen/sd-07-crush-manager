const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');

// from https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback
// const {
//   randomBytes,
// } = import('crypto');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const NOT_FOUND = 404;
const BAD_REQUEST = '400';
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

const crushJSON = './crush.json';

// function from https://ui.dev/validate-email-address-javascript/
const emailIsValid = (email) => {
  let message;
  if (!email) {
    message = 'O campo "email" é obrigatório';
  } else if (!(/\S+@\S+\.\S+/.test(email))) {
    message = 'O "email" deve ter o formato "email@email.com"';
  }
  return message;
};

const passwordIsValid = (password) => {
  const MIN_PASSWORD_LENGTH = 6;
  let message;
  if (!password) {
    message = 'O campo "password" é obrigatório';
  } else if (password.toString().length < MIN_PASSWORD_LENGTH) {
    message = 'A "senha" deve ter pelo menos 6 caracteres';
  }
  return message;
};

const getToken = () => 
   crypto.randomBytes(8).toString('hex');
  // return randomBytes(8).toString('hex');

// reads content from file crush.json
const readCrushs = async () => {
  try {
    const content = await fs.readFile(crushJSON, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Cannot read file');
  }
};
// returns an array of all crushes (requirement n1)
app.get('/crush', async (req, res) => {
  const allCrushs = await readCrushs();
  res.status(SUCCESS).send(allCrushs);
});

// returns a crush from an id (requirement n2)
app.get('/crush/:id', async (req, res) => {
  const allCrushs = await readCrushs();
  const selectedCrush = allCrushs.find((crush) => crush.id === Number(req.params.id));
  if (selectedCrush) {
    res.status(SUCCESS).send(selectedCrush);
  } else {
    res.status(NOT_FOUND).send({
      message: 'Crush não encontrado',
    });
  }
});

// creates post for login (requirement n3)
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const emailValidation = emailIsValid(email);
  const passwordValidation = passwordIsValid(password);
  if (emailValidation) {
    return res.status(BAD_REQUEST).send({ message: `${emailValidation}` });
  }
  if (passwordValidation) {
    return res.status(BAD_REQUEST).send({ message: `${passwordValidation}` });
  } 
    return res.status(SUCCESS).send({ token: `${getToken()}` });
});

app.listen(PORT, () => { console.log('Online'); });
