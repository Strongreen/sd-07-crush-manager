const express = require('express');
const fs = require('fs').promises;

const app = express();
app.use(express.json());

const SUCCESS = 200;
const PORT = '3000';
const dateMessage = {
  message:
    'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
};
const crushFile = './crush.json';
const crushRouteId = '/crush/:id';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+$/;
  return re.test(email);
};

const validateDate = (receivedDate) => {
  const re = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  return re.test(receivedDate);
};

const tokenAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      message: 'Token não encontrado',
    });
  }

  if (authorization.length !== 16) {
    return res.status(401).json({
      message: 'Token inválido',
    });
  }

  next();
};

const nameAuth = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      message: 'O campo "name" é obrigatório',
    });
  }

  if (name.length < 3) {
    return res.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }

  next();
};

const ageAuth = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(400).json({
      message: 'O campo "age" é obrigatório',
    });
  }

  if (age <= 17) {
    return res.status(400).json({
      message: 'O crush deve ser maior de idade',
    });
  }

  next();
};

const dateAuth = (req, res, next) => {
  const { date } = req.body;
  if (!date) {
    res.status(400).json(dateMessage);
  }
  if (!date.datedAt) {
    res.status(400).json(dateMessage);
  }
  const dateIsValid = validateDate(date.datedAt);
  if (!dateIsValid) {
    return res.status(400).json({
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};

const dateAuth2 = (req, res, next) => {
  const { date } = req.body;

  if (!date.rate && date.rate !== 0) {
    return res.status(400).json({
      message:
        'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }

  if (date.rate > 5 || date.rate < 1) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  next();
};

const emailAuth = (req, res, next) => {
  const { email } = req.body;
  if (!email || email === '') {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  }
  const ValidEmail = validateEmail(email);
  if (!ValidEmail) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  next();
};
app.get('/crush', async (req, res) => {
  const crushs = await fs.readFile(crushFile);
  const babado = JSON.parse(crushs);
  res.status(SUCCESS).json(babado);
});

app.get(crushRouteId, async (req, res) => {
  const crushs = await fs.readFile(crushFile);
  const idteste = Number(req.params.id);
  const babado = JSON.parse(crushs);
  const found = await babado.find((element) => element.id === idteste);
  if (found) {
    return res.status(SUCCESS).json(found);
  }
  return res.status(404).json({
    message: 'Crush não encontrado',
  });
});

app.post('/login', emailAuth, (req, res) => {
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

app.post('/crush', tokenAuth, nameAuth, ageAuth, dateAuth, dateAuth2, async (req, res) => {
  const { name, age, date } = req.body;
  const crushs = await fs.readFile(crushFile);
  const crushsJson = JSON.parse(crushs);
  const size = crushsJson.length;
  crushsJson[size] = {
    id: `${size + 1}`,
    name,
    age,
    date,
  };
  try {
    await fs.writeFile(crushFile, JSON.stringify(crushsJson));
    res.status(201).json({ id: Number(`${size + 1}`), name, age, date });
  } catch (error) {
    throw new Error(error);
  }
});

app.put(
  crushRouteId,
  tokenAuth,
  nameAuth,
  ageAuth,
  dateAuth,
  dateAuth2,
  async (req, res) => {
    const { name, age, date } = req.body;
    const crushs = await fs.readFile(crushFile);
    const crushsJson = JSON.parse(crushs);
    const editId = req.params.id;

    crushsJson[editId - 1] = {
      id: Number(editId),
      name,
      age,
      date,
    };
    try {
      await fs.writeFile(crushFile, JSON.stringify(crushsJson));
      res.status(200).json(crushsJson[editId - 1]);
    } catch (error) {
      throw new Error(error);
    }
  },
);

app.delete(crushRouteId, tokenAuth, async (req, res) => {
  const crushs = await fs.readFile(crushFile);
  const crushsJson = JSON.parse(crushs);
  const deleteId = req.params.id;
  const index = deleteId - 1;
  crushsJson.splice(index, 1);

  try {
    await fs.writeFile(crushFile, JSON.stringify(crushsJson));
    res.status(200).json({ message: 'Crush deletado com sucesso' });
  } catch (error) {
    throw new Error(error);
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
