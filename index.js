const express = require('express');
const fs = require('fs');
const crypto = require('crypto');

const dataMaster = ('./crussh.json');
const app = express();
app.use(express.json());

const SUCCESS = 200;
const SUCCESS_1 = 201;
const FAIL = 400;
const FAIL_HEADER = 401;
const FAIL_2 = 404;
const INTERNAL_ERROR = 500;
const PORT = '3000';

const caminhoDoCrush = './crush.json';
const messageTokenOne = 'Token não encontrado';
const messageTokenTwo = 'Token inválido';
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.status(SUCCESS).send(
    {
      message: 'Só para voce saber amigo, ta logado; server ok',
    },
  );
});

/* Requisito 1 */
app.get('/crush', (_req, res) => {
  const data = JSON.parse(fs.readFileSync(caminhoDoCrush, 'utf8'));
  if (data.length === 0) {
    return res.status(SUCCESS).send([]);
  }
  res.status(SUCCESS).send(data);
});

/* Requisito 2 */
app.get('/crush/:id', (req, res) => {
  const data2 = JSON.parse(fs.readFileSync(caminhoDoCrush, 'utf8'));
  /* console.log(data2); */
  const { id } = req.params;
  const crushId = parseInt(id, 10);
  const crushFind = data2.find((crush) => crush.id === crushId);
  if (crushFind) res.status(SUCCESS).send(crushFind);
  return res.status(FAIL_2).send({ message: 'Crush não encontrado' });
});

/* Requisito 3 */
function validEmail(email) {
  const reGex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === undefined) {
    return {
      error: true,
      message: 'O campo "email" é obrigatório',
    };
  }

  if (!reGex.test(email)) {
    return {
      error: true,
      message: 'O "email" deve ter o formato "email@email.com"',
    };
  }

  return { error: false };
}

function validPass(password) {
  if (password === undefined) {
    return {
      error: true,
      message: 'O campo "password" é obrigatório',
    };
  }
  if (String(password).length < 6) {
    return {
      error: true,
      message: 'A "senha" deve ter pelo menos 6 caracteres',
    };
  }
  return { error: false };
}

app.post('/login', (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  const { email, password } = req.body;

  try {
    const validEmailResult = validEmail(email);
    if (validEmailResult.error) {
      return res.status(FAIL).json({ message: validEmailResult.message });
    }
    const validPasswordResult = validPass(password);
    if (validPasswordResult.error) {
      return res.status(FAIL).json({ message: validPasswordResult.message });
    }
    return res.status(SUCCESS).json({ token });
  } catch (error) {
    res.status(INTERNAL_ERROR).send({ message: 'ta zuado o role' });
  }
});

/* Requisito 4 */
function validName(name) {
  if (name === undefined) {
    throw new Error('O campo "name" é obrigatório');
  }
  if (String(name).length < 3) {
    throw new Error('O "name" deve ter pelo menos 3 caracteres');
  }
}

function validAge(age) {
  if (age === undefined) {
    throw new Error('O campo "age" é obrigatório');
  }
  if (Number(age) < 18) {
    throw new Error('O crush deve ser maior de idade');
  }
}

function validDate(datedAt) {
  const reGex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  if (!reGex.test(datedAt)) {
    throw new Error('O campo "datedAt" deve ter o formato "dd/mm/aaaa"');
  }
}

function validRate(rate) {
  if (Number(rate) < 1 || Number(rate) > 5) {
    throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');
  }
}

function validaDatedAtIsValid(element) {
  if (!element.date.datedAt || element.date.datedAt === undefined) {
    return true;
  }
}

function validaDate(element) {
  if (element.date === undefined
    || validaDatedAtIsValid(element)
    || element.date.rate === ''
    || element.date.rate === undefined
  ) {
    throw new Error('O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
  }
}

function validForAll(element) {
  /* validAuthorization(element.authorization); */
  validaDate(element);
  validName(element.name);
  validAge(element.age);
  validDate(element.date.datedAt);
  validRate(element.date.rate);
}

app.post('/crush', (req, res) => {
  const { authorization } = req.headers;
  const { name, age, date } = req.body;
  const element = req.body;
  const data3 = JSON.parse(fs.readFileSync(caminhoDoCrush, 'utf8'));
  if (!authorization) {
    return res.status(FAIL_HEADER).json({ message: messageTokenOne });
  } if (authorization.length < 16) {
    return res.status(FAIL_HEADER).json({ message: messageTokenTwo });
  }
  try {
    validForAll(element);
  } catch (error) {
    return res.status(FAIL).json({ message: error.message });
  }
  data3.push({ id: data3.length + 1, name, age, date });
  fs.writeFileSync(caminhoDoCrush, JSON.stringify(data3));
  res.status(SUCCESS_1).send(data3[data3.length - 1]);
});

/* const data4 = JSON.parse(fs.readFileSync(caminhoDoCrush, 'utf8')); */
/* data4[id].find((crush) => crush.id === crush); */
/* Desafio 5 */
app.put('/crush/id:', (req, res) => {
  const { authorization } = req.headers;
  const { name, age, date } = req.body;
  const { id } = req.params;
  const element = req.body;
  if (!authorization) {
    res.status(FAIL_HEADER).json({ message: messageTokenOne });
  }
  if (authorization.length < 16) {
    res.status(FAIL_HEADER).json({ message: messageTokenTwo });
  }
  try {
    validForAll(element);
    dataMaster[id - 1] = { name, age, date };
    fs.writeFileSync(caminhoDoCrush, JSON.stringify(dataMaster));
  } catch (error) {
    return res.status(FAIL).json({ message: error.message });
  }
  res.status(SUCCESS_1).send(dataMaster.id);
});

app.delete('/crush/:id', (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  const data5 = JSON.parse(fs.readFileSync(caminhoDoCrush, 'utf8'));
  if (!authorization) {
    res.status(FAIL_HEADER).json({ message: messageTokenOne });
  }
  if (authorization.length < 16) {
    res.status(FAIL_HEADER).json({ message: messageTokenTwo });
  }
  try {
    const index = id - 1;
    data5.splice(index, 1);
    fs.writeFileSync(caminhoDoCrush, JSON.stringify(data5));
  } catch (error) {
    throw new Error(error);
  }
  res.status(SUCCESS).json({ message: 'Crush deletado com sucesso' });
});

app.use((err, _req, res, _next) => {
  res.status(FAIL).json({ message: err.message });
});

app.listen(PORT, () => { console.log('O Pai ta ON na Porta 3000'); });
