const crypto = require('crypto');
const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());
const SUCCESS = 200;
const PORT = '3000';
// const crushList = JSON.parse(fs.readFile('./crush.json', 'utf8'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

async function readFile() {
  return JSON.parse(await fs.readFile('./crush.json', 'utf8'));
}
// 1
app.get('/crush', async (req, res) => {
  const crushList = await readFile();
  if (crushList.length > 0) {
    return res.status(200).json(crushList);
  }
  if (crushList.length <= 0) {
    return res.status(200).json([]);
  }
});
// 2
app.get('/crush/:idtofind', async (req, res) => {
  const { idtofind } = req.params;
  const crushList = await readFile();
  const crushIndex = crushList.findIndex(({ id }) => id === Number(idtofind));
  if (crushIndex === -1) {
    res.status(404).send({ message: 'Crush não encontrado' });
  }
  res.status(200).send(crushList[crushIndex]);
});
// 3
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  const regexValidation = regex.test(email);

  if (!password) { res.status(400).send({ message: 'O campo "password" é obrigatório' }); }
  if (password.length < 6) {
    res.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  if (!email) { res.status(400).send({ message: 'O campo "email" é obrigatório' }); }
  if (!regexValidation) {
    res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  const generatedToken = crypto.randomBytes(8).toString('hex');
  res.send({
    token: generatedToken,
  });
});

// function validateToken(authorization) {
//   if (!authorization) {
//     throw new Error('Token não encontrado');
//   }
//   if (authorization.length !== 16) {
//     throw new Error('Token inválido');
//   }
// }
function validateName(name) {
  if (!name) { throw new Error('O campo "name" é obrigatório'); }
  if (name.length < 3) { throw new Error('O "name" deve ter pelo menos 3 caracteres'); }
}
function validateAge(age) {
  if (!age) { throw new Error('O campo "age" é obrigatório'); }
  if (age < 18) { throw new Error('O crush deve ser maior de idade'); }
}
function validateRate(rate) {
  if (rate < 1 || rate > 5 || rate !== Math.floor(rate)) {
    throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');
  }
}
function regexValidate(datedAt) {
  const regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  const regexValidation = regex.test(datedAt);
  if (!regexValidation) { throw new Error('O campo "datedAt" deve ter o formato "dd/mm/aaaa"'); }
}
function validateDate(date) {
  if (!date || !date.datedAt || date.rate === undefined) {
    throw new Error('O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
  }
  const { datedAt, rate } = date;
  regexValidate(datedAt);
  validateRate(rate);
}

const validationToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(401).send({ message: 'Token inválido' });
  }
  next();
};

// 4
app.post('/crush', validationToken, rescue(async (req, res) => {
  const { name, age, date } = req.body;
  const crushList = JSON.parse(await fs.readFile('./crush.json', 'utf8'));
  const copy = [...crushList];
  try {
    validateName(name);
    validateDate(date);
    validateAge(age);
    copy.push(req.body);
    copy[copy.length - 1].id = copy.length;
    await fs.writeFile(`${__dirname}/crush.json`, JSON.stringify(copy), (err) => {
      if (err) throw err;
    });
    res.status(201).send(copy[copy.length - 1]);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}));
function createNew(oldOne, req, idtofind) {
  const { name, age, date } = req.body;
  return ({
    name: name || oldOne.name,
age: age || oldOne.age,
    id: Number(idtofind),
date: {
      datedAt: date.datedAt || oldOne.date.datedAt,
      rate: date.rate || oldOne.date.rate,
    },
  });
}
// 5
app.put('/crush/:idtofind', validationToken, async (req, res) => {
  const { idtofind } = req.params; const { name, age, date } = req.body;
  const crushList = await readFile();
  const crushIndex = crushList.findIndex(({ id }) => id === Number(idtofind));
  if (crushIndex === -1) { return res.status(404).send({ message: 'Crush não encontrado' }); }
  const oldOne = (crushList[crushIndex]);
  try {
    validateName(name); validateDate(date); validateAge(age);
    crushList[crushIndex] = createNew(oldOne, req, idtofind);
    await fs.writeFile(`${__dirname}/crush.json`, JSON.stringify(crushList), (err) => {
      if (err) throw err;
    }); res.status(200).send(crushList[crushIndex]);
  } catch (error) { res.status(400).send({ message: error.message }); }
});

app.listen(PORT, () => { console.log('Online'); });
