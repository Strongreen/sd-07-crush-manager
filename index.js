const express = require('express');
const fs = require('fs').promises;

const app = express();
app.use(express.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

const crushList = '/crush';
const crushId = '/crush/:id';
app.listen(PORT, () => { console.log('Online'); });

 const emailValidation = (email) => {
  const rejexForEmail = /^[^\s@]+@[^\s@]+$/;
  return rejexForEmail.test(email);
};

const dateValidation = (datedAt) => {
  const regexForDate = /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d$/g; 
  return regexForDate.test(datedAt);
};

const authorizationEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  const validEmail = emailValidation(email);
  if (!validEmail) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const validateName = (crush) => {
  const { name } = crush;

  if (!name) {
    throw new Error('O campo "name" é obrigatório');
  }

  if (name.length < 3) {
    throw new Error('O "name" deve ter pelo menos 3 caracteres');
  }
};

const validateAge = (crush) => {
  const { age } = crush;
  if (!age) {
    throw new Error('O campo "age" é obrigatório');
  }

  if (age < 18) {
    throw new Error('O crush deve ser maior de idade');
  }
};

const validateDate = (crush) => {
  const { date } = crush;

  if (!date || !date.datedAt || date.rate === undefined) {
    throw new Error('O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
  }
};

const validateDateToo = (crush) => {
  const { date } = crush;
  const { datedAt, rate } = date;

  const validData = dateValidation(datedAt);
  if (!validData) {
    throw new Error('O campo "datedAt" deve ter o formato "dd/mm/aaaa"');
  }

  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');
  }
};

const validationToken = (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) {
    return res.status(401).json({
      message: 'Token não encontrado',
    });
  }

  if (token.length !== 16) {
    return res.status(401).json({
      message: 'Token inválido',
    });
  }

  next();
};

const firstFile = () => fs.readFile('./crush.json', 'utf8');

app.get(crushList, async (_req, res) => {
  const myCrush = await firstFile();
  const newListCrush = JSON.parse(myCrush);
  return res.status(SUCCESS).json(newListCrush);
});

app.get(crushId, async (req, res) => {
  const myCrush = await firstFile();
  const id = Number(req.params.id);
  const crushJson = JSON.parse(myCrush);
  const idCrush = await crushJson.find((crush) => crush.id === id);
  if (idCrush) {
    return res.status(SUCCESS).json(idCrush);
  }
  return res.status(404).json({
    message: 'Crush não encontrado',
  });
});

app.post('/login', authorizationEmail, (req, res) => {
  const { password } = req.body;
  if (!password || password === '') {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: 'A "senha" deve ter pelo menos 6 caracteres',
    });
  }

   return res.status(SUCCESS).json({
    token: '7mqaVRXJSp886CGr',
  });
});

app.post('/crush', validationToken, async (req, res) => {
  const myCrush = await firstFile();
  const data = JSON.parse(myCrush);
  const size = data.length;
  try {
    validateName(req.body);
    validateAge(req.body);
    validateDate(req.body);
    validateDateToo(req.body);
    const { name, age, date } = req.body;
    const myObj = { name, age, id: size + 1, date };

  data[size] = myObj;
    await fs.writeFile(`${__dirname}/crush.json`, JSON.stringify(data));
    res.status(201).json(myObj);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put(crushId, validationToken, async (req, res) => {
  const myCrush = await firstFile();
  const data = JSON.parse(myCrush);
  const id = Number(req.params.id);

  try {
    validateName(req.body);
    validateAge(req.body);
    validateDate(req.body);
    validateDateToo(req.body);
    const { name, age, date } = req.body;
    data[id - 1] = { name, id, age, date };
    await fs.writeFile(`${__dirname}/crush.json`, JSON.stringify(data));
    res.status(200).json(data[id - 1]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete(crushId, validationToken, async (req, res) => {
  const myCrush = await firstFile();
  const data = JSON.parse(myCrush);
  const id = Number(req.params.id);

  const index = id - 1;
    data.splice(index, 1);

  try {
    await fs.writeFile(`${__dirname}/crush.json`, JSON.stringify(data));
        res.status(200).send({ message: 'Crush deletado com sucesso' });
  } catch (error) {
    throw new Error(error);
  }
});