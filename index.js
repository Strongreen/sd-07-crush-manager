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
const UNAUTHORIZED = 401;
const CREATED = 201;
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

const getToken = () => crypto.randomBytes(8).toString('hex');

const tokenIsValid = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(UNAUTHORIZED).send({ message: 'Token não encontrado' });
  }
  if (token.length !== 16) {
    return res.status(UNAUTHORIZED).send({ message: 'Token inválido' });
  }
  next();
};

const nameIsValid = (name) => {
  let message;
  if (!name) {
    message = 'O campo "name" é obrigatório';
  } else if (name.length < 3) {
    message = 'O "name" deve ter pelo menos 3 caracteres';
  }
  return message;
};

// verifies if age key attends requirements
const ageIsValid = (age) => {
  let message;
  if (!age) {
    message = 'O campo "age" é obrigatório';
  }
  if (age < 18) {
    message = 'O crush deve ser maior de idade';
  }
  return message;
};

// verifies if date key and contents exist
const dateIsValid = (date) => {
  let message;
  if (!date || !date.datedAt || !date.rate) {
    message = 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';
  }
  return message;
};

// verifies is date content has correct format
const contentIsValid = (date) => {
  let message;
  const splitDate = date.datedAt.split('/');
  if (splitDate.length === 1) {
    message = 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"';
  } else if (date.rate < 1 || date.rate > 5) {
    message = 'O campo "rate" deve ser um inteiro de 1 à 5';
  }
  return message;
};

// verifies if all key entries attend requirements
const crushCreationValidation = (name, age, date) => {
  const nameValidation = nameIsValid(name);
  const ageValidation = ageIsValid(age);
  const dateValidation = dateIsValid(date);
  const dateContentValidation = contentIsValid(date);
  const check = [nameValidation, ageValidation, dateValidation, dateContentValidation];
  return check.find((validation) => validation !== undefined);
};

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
  return res.status(SUCCESS).send(allCrushs);
});

// returns a crush from an id (requirement n2)
app.get('/crush/:id', async (req, res) => {
  const allCrushs = await readCrushs();
  const selectedCrush = allCrushs.find((crush) => crush.id === Number(req.params.id));
  if (selectedCrush) {
    return res.status(SUCCESS).send(selectedCrush);
  } 
    return res.status(NOT_FOUND).send({
      message: 'Crush não encontrado',
    });
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

// allows to add a new crush (requirement n4)
app.post('/crush', tokenIsValid, async (req, res) => {
  const { name, age, date } = req.body;
  const validateInput = crushCreationValidation(name, age, date);
  if (validateInput) {
    return res.status(BAD_REQUEST).send({ message: `${validateInput}` });
  }
  const allCrushs = await readCrushs();
  // lines bellow adapted from @carolbezerra-dev
  const newCrush = { id: allCrushs.length + 1, name, age, date };
  const addCrush = [...allCrushs, newCrush];
  await fs.writeFile(crushJSON, JSON.stringify(addCrush));
  return res.status(CREATED).send(newCrush);
});

app.listen(PORT, () => { console.log('Online'); });
