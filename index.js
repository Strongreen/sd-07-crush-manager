const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';
const minimumChar = 3;
const tokenLength = 16;
const emailMissed = { message: 'O campo "email" é obrigatório' };
const passwordMissed = { message: 'O campo "password" é obrigatório' };
const invalidEmail = { message: 'O "email" deve ter o formato "email@email.com"' };
const passwordLength = { message: 'A "senha" deve ter pelo menos 6 caracteres' };
const dateMissed = { 
  message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios', 
};
const dateRegex = /([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
const crushRoute = '/crush';
const crushIdRoute = '/crush/:id';

const loginExistsMiddleware = (req, res, next) => {
  const { password, email } = req.body;

  if (!email || email === '') return res.status(400).send(emailMissed);
  if (!password) return res.status(400).send(passwordMissed);
  next();
};

const loginValidMiddleware = (req, res, next) => {
  const { password, email } = req.body;
  const reg = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;

  if (!reg.test(email)) return res.status(400).send(invalidEmail);
  if (password.toString().length < 6) return res.status(400).send(passwordLength);
  next();
};

const validateCrushExistsMiddleware = (req, res, next) => {
  const { name, age, date } = req.body;

  if (!name) {
    return res.status(400).send({ message: 'O campo "name" é obrigatório' });
  }
  if (!age) {
    return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  }
  if (!date) {
    return res.status(400).send(dateMissed);
  }
  next();
};

const validateTokenMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ message: 'Token não encontrado' });
  }
  if (authorization.length < tokenLength) {
    return res.status(401).send({ message: 'Token inválido' });
  }
  next();
};

const validateCrushMiddleware = (req, res, next) => {
  const { name, age, date } = req.body;
  const { datedAt } = date;

  if (name.length < minimumChar) {
    return res
      .status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (age < 18) {
    return res.status(400).send({ message: 'O crush deve ser maior de idade' });
  }

  if (!dateRegex.test(datedAt)) {
    return res.status(400)
      .send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const validateDateMiddleware = (req, res, next) => {
  if (req.body.date.datedAt === '' || req.body.date.rate === ''
  || !req.body.date.datedAt || req.body.date.rate === undefined) {
    return res.status(400).send(dateMissed);
  }

  next();
};
const validateRateMiddleware = (req, res, next) => {
  const { rate } = req.body.date;
  const minimalRange = 1;
  const maxRange = 5;
  if (rate < minimalRange || rate > maxRange) {
    return res.status(400).send({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  next();
};
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get(crushRoute, (_req, res) => fs.promises.readFile(`${__dirname}/crush.json`, 'utf-8')
  .then((result) => res.status(200).send(JSON.parse(result)))
  .catch((_err) => console.log('arquivo crush.json não encontrado')));

app.get(
  '/crush/search',
  validateTokenMiddleware,
  async (req, res) => {
    try {
      const { q } = req.query;
      if (q === '' || !q) return res.status(200).send([]);
      const response = JSON.parse(await fs.promises.readFile(`${__dirname}/crush.json`, 'utf-8'));
      return res.status(200).send(response.filter((element) => element.name.includes(q))); 
    } catch (err) {
      console.log(err);
    }
},
);

app.get('/crush/:id', async (req, res) => {
  const response = await JSON.parse(await fs.promises.readFile(`${__dirname}/crush.json`, 'utf-8'));
  const crush = response.find(
    (element) => parseInt(req.params.id, 10) === element.id,
  );
  return crush
    ? res.status(200).send(crush)
    : res.status(404).send({ message: 'Crush não encontrado' });
});

app.post('/login', loginExistsMiddleware, loginValidMiddleware, (req, res) => {
  let token = '';
  for (let index = 0; index <= 15; index += 1) {
    token += String.fromCharCode(Math.round(Math.random() * (122 - 48) + 48));
  }
  req.headers.Authorization = token;
  return res.status(200).send({ token });
});

app.post(
  crushRoute,
  validateTokenMiddleware,
  validateCrushExistsMiddleware,
  validateDateMiddleware,
  validateRateMiddleware,
  validateCrushMiddleware,
  async (req, res) => {
    try {
      const response = JSON.parse(await fs.promises.readFile(`${__dirname}/crush.json`, 'utf-8'));
      req.body.id = response.length + 1;
      response.push(req.body);
      return fs.promises
        .writeFile(`${__dirname}/crush.json`, JSON.stringify(response))
        .then(() => res.status(201).send(req.body))
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  },
);

app.put(
  crushIdRoute,
  validateTokenMiddleware,
  validateCrushExistsMiddleware,
  validateDateMiddleware,
  validateRateMiddleware,
  validateCrushMiddleware,
  async (req, res) => {
    const response = await fs.promises.readFile(`${__dirname}/crush.json`, 'utf-8');
    const { id } = req.params;
    const convertedId = parseInt(id, 10);
    req.body.id = convertedId;
    const newObject = JSON.parse(response).map((element) => 
    (element.id === convertedId ? req.body : element));
    console.log(newObject);
    return fs.promises
      .writeFile(`${__dirname}/crush.json`, JSON.stringify(newObject))
      .then(() => res.status(200).send(req.body))
      .catch((err) => console.log(err));
  },
);

app.delete(
  crushIdRoute,
  validateTokenMiddleware,
  async (req, res) => {
    const response = JSON.parse(await fs.promises.readFile(`${__dirname}/crush.json`, 'utf-8'));
    const { id } = req.params;
    const convertedId = parseInt(id, 10);
    req.body.id = convertedId;
    response.forEach((element, index) => {
      if (element.id === convertedId) response.splice(index, 1);
    });
    return fs.promises
      .writeFile(`${__dirname}/crush.json`, JSON.stringify(response))
      .then(() => res.status(200).send({ message: 'Crush deletado com sucesso' }))
      .catch((err) => console.log(err));
  },
);

app.listen(PORT, () => {
  console.log('Online');
});
