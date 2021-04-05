const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const PATH_CRUSH = './crush.json';
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

const getJSON = () => JSON.parse(fs.readFileSync(PATH_CRUSH, 'utf-8'));

app.get('/crush', (_req, res) => {
  const crushJSON = getJSON();
  res.status(SUCCESS).json(crushJSON);
});

const validateToken = (token, res) => {
  if (!token) {
    return res
      .status(UNAUTHORIZED)
      .json({ message: 'Token não encontrado' });
  } if (token.length < 16) {
    return res
      .status(UNAUTHORIZED)
      .json({ message: 'Token inválido' });
  }
};

app.get('/crush/search', (req, res) => {
  const { authorization } = req.headers;
  if (!validateToken(authorization, res)) {
    let crushsArray = [...getJSON()];
    const { q } = req.query;
    if (q) {
      crushsArray = crushsArray.filter(({ name }) => name.includes(q));
    }
    res.status(200).send(crushsArray);
  }
});

const routeCrushId = '/crush/:id';

app.get(routeCrushId, (req, res) => {
  const { id } = req.params;
  const filteredCrush = getJSON().find((crush) => crush.id === Number(id));
  if (filteredCrush) {
    res.status(SUCCESS).json(filteredCrush);
  } else {
    res.status(NOT_FOUND).json({ message: 'Crush não encontrado' });
  }
});

const generateToken = (length) => crypto.randomBytes(length).toString('hex');

const validateEmail = (email, res) => {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!email) {
    return res
      .status(BAD_REQUEST)
      .json({ message: 'O campo "email" é obrigatório' });
  } if (!regex.test(email)) {
    return res
      .status(BAD_REQUEST)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
};

const validatePassword = (password, res) => {
  if (!password) {
    return res
      .status(BAD_REQUEST)
      .json({ message: 'O campo "password" é obrigatório' });
  } if (password.length < 6) {
    return res
      .status(BAD_REQUEST)
      .json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
};

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  validateEmail(email, res);
  validatePassword(password, res);

  const tokenLength = 8;
  res.status(SUCCESS).json({ token: generateToken(tokenLength) });
});

const validateName = (name, res) => {
  if (!name) {
    return res
      .status(BAD_REQUEST)
      .json({ message: 'O campo "name" é obrigatório' });
  } if (name.length < 3) {
    return res
      .status(BAD_REQUEST)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
};

const validateAge = (age, res) => {
  const older = 18;
  if (!age) {
    return res
      .status(BAD_REQUEST)
      .json({ message: 'O campo "age" é obrigatório' });
  } if (age < older) {
    return res
      .status(BAD_REQUEST)
      .json({ message: 'O crush deve ser maior de idade' });
  }
};
const messageDate = 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';

const checkIsNumberAndRange = (number) => number < 1 || number > 5 || Number.isNaN(number);

const validateRate = (rate, res) => {
  const rateNumber = Number(rate);
  if (!rate && rateNumber !== 0) {
    return res
      .status(BAD_REQUEST)
      .json({ message: messageDate });
  } if (checkIsNumberAndRange(rateNumber)) {
    return res
      .status(BAD_REQUEST)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
};

const valiDatedAt = (datedAt, res) => {
  const regexDateFormat = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  if (!datedAt) {
    return res
      .status(BAD_REQUEST)
      .json({ message: messageDate });
  } 
  if (!regexDateFormat.test(datedAt)) {
    return res
      .status(BAD_REQUEST)
      .json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  } 
};

const validateDate = (date, res) => {
  if (!date) {
    return res
      .status(BAD_REQUEST)
      .json({ message: messageDate });
  }

  const { datedAt, rate } = date;
  if (valiDatedAt(datedAt, res) || validateRate(rate, res)) {
    return true;
  }
};

const validateCrush = (crush, token, res) => {
  const { name, age, date } = crush;
  return !validateToken(token, res)
  && !validateName(name, res)
  && !validateAge(Number(age), res)
  && !validateDate(date, res);
};

app.post('/crush', (req, res) => {
  const crush = req.body;
  const { authorization } = req.headers;

  if (validateCrush(crush, authorization, res)) {
    const crushsArray = getJSON();
    const id = crushsArray.length + 1;
    const newCrush = { id, ...crush };
    const newCrushsArray = [...crushsArray, newCrush];
    fs.writeFileSync(PATH_CRUSH, JSON.stringify(newCrushsArray));
    res.status(CREATED).json(newCrush);
  }
});

app.put(routeCrushId, (req, res) => {
  const crushToEdit = req.body;
  const { authorization } = req.headers;

  if (validateCrush(crushToEdit, authorization, res)) {
    const crushsArray = [...getJSON()];
    const id = Number(req.params.id);

    const index = crushsArray.findIndex((crush) => crush.id === id);

    crushsArray[index] = { ...crushToEdit, id };

    fs.writeFileSync(PATH_CRUSH, JSON.stringify(crushsArray));
    res.status(SUCCESS).json(crushsArray[index]);
  }
});

app.delete(routeCrushId, (req, res) => {
  const { authorization } = req.headers;
  if (!validateToken(authorization, res)) {
    const crushsArray = [...getJSON()];
    const id = Number(req.params.id);
    const newCrushsArray = crushsArray.filter((crush) => crush.id !== id);
    fs.writeFileSync(PATH_CRUSH, JSON.stringify(newCrushsArray));
    res.status(SUCCESS).json({ message: 'Crush deletado com sucesso' });
  }
});

app.listen(PORT, () => { console.log('Online'); });
