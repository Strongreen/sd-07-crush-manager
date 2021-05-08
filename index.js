const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const { OK, NOT_FOUND, BAD_REQUEST, UNAUTHORIZED, CREATED } = require('./httpCode');
const {
  notFound,
  emailIsMandatory,
  emailWrongFormat,
  passwordIsMandatory,
  passwordWrongFormat,
  tokenDoesntFound,
  tokenInvalid,
  nameIsMandatory,
  nameWrongFormat,
  ageIsMandatory,
  ageInvalid,
  dateWrongFormat,
  rateInvalid,
  dateIsMandatory,
  crushDeleted,
} = require('./errorMessages');

const { getToken } = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(UNAUTHORIZED).send(tokenDoesntFound);
  if (authorization.length < 16) return res.status(UNAUTHORIZED).send(tokenInvalid);
  next();
};

app.get('/', (_req, res) => {
  res.status(OK).send();
});

const crushRouteId = '/crush/:id';

app.get('/crush', async (_req, res) => {
  const data = await fs.promises.readFile(`${__dirname}/crush.json`, 'utf-8')
    .then((result) => res.status(OK).send(JSON.parse(result)))
    .catch((err) => console.error(err));
  return data;
});

app.get(
  '/crush/search',
  validateToken,
  async (req, res) => {
    const { q: searchTerm } = req.query;
    const data = await fs.promises.readFile(`${__dirname}/crush.json`, 'utf-8')
      .then((result) => res.status(OK).send(JSON.parse(result)))
      .catch((err) => console.error(err));

    if (!searchTerm || searchTerm === '') return data;

    const find = data.filter(({ name }) => name.includes(searchTerm));
    return res.status(OK).send(find);
  },
);

app.get(crushRouteId, async (req, res) => {
  const { id } = req.params;
  const data = await fs.promises.readFile(`${__dirname}/crush.json`, 'utf-8');
  const result = JSON.parse(data).find((crush) => crush.id === Number(id));

  if (result === undefined) {
    return res.status(NOT_FOUND).json(notFound);
  }
  return res.status(OK).json(result);
});

const validateCrushExistence = (req, res, next) => {
  const { name, age, date } = req.body;

  if (!name) return res.status(BAD_REQUEST).send(nameIsMandatory);
  if (!age) return res.status(BAD_REQUEST).send(ageIsMandatory);
  if (!date) return res.status(BAD_REQUEST).send(dateIsMandatory);

  next();
};

const validateRate = (req, res, next) => {
  const { rate, datedAt } = req.body.date;
  if (!datedAt) return res.status(BAD_REQUEST).send(dateIsMandatory);
  if (rate === undefined) return res.status(BAD_REQUEST).send(dateIsMandatory);
  if (rate < 1 || rate > 5) return res.status(BAD_REQUEST).send(rateInvalid);
  next();
};

const validateCrush = (req, res, next) => {
  const { name, age, date } = req.body;
  // source: https://github.com/tryber/sd-07-crush-manager/blob/Pedro-Paulo-Project-crush-manager/index.js
  const dateRegex = /([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  if (name.length < 3) return res.status(BAD_REQUEST).send(nameWrongFormat);
  if (age < 18) return res.status(BAD_REQUEST).send(ageInvalid);
  if (!dateRegex.test(date.datedAt)) return res.status(BAD_REQUEST).send(dateWrongFormat);
  next();
};

app.post(
  '/crush',
  validateToken,
  validateCrushExistence,
  validateRate,
  validateCrush,
  async (req, res) => {
    // source: https://github.com/tryber/sd-07-crush-manager/blob/Pedro-Paulo-Project-crush-manager/index.js
    try {
      const data = await JSON.parse(await fs.promises.readFile(`${__dirname}/crush.json`));
      req.body.id = data.length + 1;
      data.push(req.body);
      return fs.promises
        .writeFile(`${__dirname}/crush.json`, JSON.stringify(data))
        .then(() => res.status(CREATED).send(req.body))
        .catch((error) => console.error(error));
    } catch (error) {
      console.error(error);
    }
  },
);

app.put(
  crushRouteId,
  validateToken,
  validateCrushExistence,
  validateRate,
  validateCrush,
  async (req, res) => {
    try {
      const { id } = req.params;
      req.body.id = Number(id);
      const data = await JSON.parse(await fs.promises.readFile(`${__dirname}/crush.json`));
      const newCrush = data.map((crush) => (crush.id === Number(id) ? req.body : crush));
      return fs.promises
        .writeFile(`${__dirname}/crush.json`, JSON.stringify(newCrush))
        .then(() => res.status(OK).send(req.body))
        .catch((error) => console.error(error));
    } catch (error) {
      console.error(error);
    }
  },
);

app.delete(
  crushRouteId,
  validateToken,
  async (req, res) => {
    try {
      const { id } = req.params;
      const data = await JSON.parse(await fs.promises.readFile(`${__dirname}/crush.json`));
      req.body.id = Number(id);
      data.forEach((crush, index) => crush.id === Number(id) && data.splice(index, 1));
      return fs.promises
        .writeFile(`${__dirname}/crush.json`, JSON.stringify(data))
        .then(() => res.status(OK).send(crushDeleted))
        .catch((error) => console.error(error));
    } catch (error) {
      console.error(error);
    }
  },
);

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
