const express = require('express');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const SUCCESS = 200;
const NOT_FIND = 404;
// const ERROR = 500;
const INVALID_REQUEST = 400;
const PORT = 3000;

app.use(express.json());

const crush = './crush.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

async function returnData() {
  const data = await fs.promises.readFile(crush, 'utf-8');
  return JSON.parse(data);
}

app.get('/crush', async (_req, res) => {
  try {
    const data = await returnData();
    
    return res.status(SUCCESS).json(data);
  } catch (err) {
    console.error(err);
  }
});

app.get('/crush/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await returnData();
    const getCrushById = data.filter((currentCrush) => currentCrush.id === Number(id));
    if (getCrushById.length < 1) {
      return res.status(NOT_FIND)
        .json({ message: 'Crush não encontrado' });
    }

    return res.status(SUCCESS).json(getCrushById[0]);
  } catch (err) {
    console.error(err);
  }
});

function testEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return {
      error: true,
      message: 'O campo "email" é obrigatório',
    };
  }
  if (!emailRegex.test(email)) {
    return {
      error: true,
      message: 'O "email" deve ter o formato "email@email.com"',
    };
  }

  return { error: false };
}

function testPassword(password) {
  if (!password) {
    return {
      error: true,
      message: 'O campo "password" é obrigatório',
    };
  }
  if (String(password).length < 6) {
    return {
      error: true,
      message: 'O "password" deve ter pelo menos 6 caracteres',
    };
  }
  return { error: false };
}

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const testEmailResult = testEmail(email);
    if (testEmailResult.error) {
      return res.status(INVALID_REQUEST).json({ message: testEmailResult.message });
    }
    const testPasswordResult = testPassword(password);
    if (testPasswordResult.error) {
      return res.status(INVALID_REQUEST).json({ message: testPasswordResult.message });
    }

    const token = crypto.randomBytes(8).toString('hex');
    return res.status(SUCCESS).json({ token });
  } catch (err) {
    console.error(err);
  }
});

app.listen(PORT, () => { console.log('Online'); });
