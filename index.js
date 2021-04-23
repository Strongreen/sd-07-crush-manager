const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const { OK, NOT_FOUND, BAD_REQUEST } = require('./httpCode');
const {
  notFound,
  emailIsMandatory,
  emailWrongFormat,
  passwordIsMandatory,
  passwordWrongFormat,
} = require('./errorMessages');

const { getToken } = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

app.get('/', (_req, res) => {
  res.status(OK).send();
});

app.get('/crush', async (_req, res) => {
  const data = await fs.promises.readFile(`${__dirname}/crush.json`, 'utf-8')
    .then((result) => res.status(OK).send(JSON.parse(result)))
    .catch((err) => console.error(err));
  return data;
});

app.get('/crush/:id', async (req, res) => {
  const { id } = req.params;
  const data = await fs.promises.readFile(`${__dirname}/crush.json`, 'utf-8');
  const result = JSON.parse(data).find((crush) => crush.id === Number(id));

  if (result === undefined) {
    return res.status(NOT_FOUND).json(notFound);
  }
  return res.status(OK).json(result);
});

const emailMiddleware = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!email || email === '') return res.status(BAD_REQUEST).send(emailIsMandatory);
  if (!emailRegex.test(email)) return res.status(BAD_REQUEST).send(emailWrongFormat);
  next();
};

const passwordMiddleware = (req, res, next) => {
  const { password } = req.body;

  if (!password || password === '') return res.status(BAD_REQUEST).send(passwordIsMandatory);
  if (password.toString().length < 6) return res.status(BAD_REQUEST).send(passwordWrongFormat);
  next();
};

app.post('/login', emailMiddleware, passwordMiddleware, async (req, res) => {
  const token = getToken();

  req.headers.Authorization = token;
  return res.status(OK).send({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
