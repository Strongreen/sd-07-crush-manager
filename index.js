const express = require('express');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const SUCCESS = 200;
const NOT_FIND = 404;
const UNAUTHORIZED = 401;
const CREATED = 201;
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

async function testExistingId(id) {
  const data = await returnData();
  return data.filter((currentCrush) => currentCrush.id === Number(id));
}

app.get('/crush/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const getCrushById = await testExistingId(id);
    if (getCrushById.length < 1) {
      return res.status(NOT_FIND)
        .json({ message: 'Crush não encontrado' });
    }

    return res.status(SUCCESS).json(getCrushById[0]);
  } catch (err) {
    console.error(err);
  }
});

function handleRequiredField(fieldName) {
  if (fieldName === 'date') {
    return {
      error: true,
      message: `O campo "${fieldName}" é obrigatório e "datedAt" e "rate" não podem ser vazios`,
    };
  }

  return {
    error: true,
    message: `O campo "${fieldName}" é obrigatório`,
  };
}

function testEmail(email, fieldName) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return handleRequiredField(fieldName);

  if (!emailRegex.test(email)) {
    return {
      error: true,
      message: `O "${fieldName}" deve ter o formato "email@email.com"`,
    };
  }

  return { error: false };
}

function testPassword(password, fieldName) {
  if (!password) return handleRequiredField(fieldName);

  if (String(password).length < 6) {
    return {
      error: true,
      message: `O "${fieldName}" deve ter pelo menos 6 caracteres`,
    };
  }
  return { error: false };
}

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const testEmailResult = testEmail(email, 'email');
    if (testEmailResult.error) {
      return res.status(INVALID_REQUEST).json({ message: testEmailResult.message });
    }
    const testPasswordResult = testPassword(password, 'password');
    if (testPasswordResult.error) {
      return res.status(INVALID_REQUEST).json({ message: testPasswordResult.message });
    }

    const token = crypto.randomBytes(8).toString('hex');
    return res.status(SUCCESS).json({ token });
  } catch (err) {
    console.error(err);
  }
});

function testName(name, fieldName) {
  if (!name) return handleRequiredField(fieldName);

  if (name.length < 3) {
    return {
      error: true,
      message: `O "${fieldName}" deve ter pelo menos 3 caracteres`,
    };
  }
  return { error: false };
}

function testAge(age, fieldName) {
  if (!age) return handleRequiredField(fieldName);

  if (age < 18) {
    return {
      error: true,
      message: 'O crush deve ser maior de idade',
    };
  }
  return { error: false };
}

function testDatedAt(datedAt, fieldName) {
  if (!datedAt) return handleRequiredField(fieldName);

  const dataRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

  if (!dataRegex.test(datedAt)) {
    return {
      error: true,
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    };
  }

  return { error: false };
}

function testRate(rate, fieldName) {
  if (rate === undefined) return handleRequiredField(fieldName);

  if (rate < 1 || rate > 5) {
    return {
      error: true,
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    };
  }

  return { error: false };
}

function testDate(date, fieldName) {
  if (date === undefined) return handleRequiredField(fieldName);

  const testDatedAtResult = testDatedAt(date.datedAt, 'date');
  if (testDatedAtResult.error) {
    return testDatedAtResult;
  }

  const testRateResult = testRate(date.rate, 'date');
  if (testRateResult.error) {
    return testRateResult;
  }

  return { error: false };
}

function checkAuthorization(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(UNAUTHORIZED).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(UNAUTHORIZED).json({ message: 'Token inválido' });
  }
  next();
}

async function createNewCrush(name, age, date) {
  const data = await returnData();
  const lastId = data[data.length - 1].id;
  return {
    id: Number(lastId + 1),
    name,
    age,
    date,
  };
}

app.post('/crush', checkAuthorization, async (req, res) => {
  const { name, age, date } = req.body;
  try {
    const testNameResult = testName(name, 'name');
    if (testNameResult.error) {
      return res.status(INVALID_REQUEST).json({ message: testNameResult.message });
    }
    const testAgeResult = testAge(age, 'age');
    if (testAgeResult.error) {
      return res.status(INVALID_REQUEST).json({ message: testAgeResult.message });
    }
    const testDateResult = testDate(date, 'date');
    if (testDateResult.error) {
      return res.status(INVALID_REQUEST).json({ message: testDateResult.message });
    }
    return res.status(CREATED).json(await createNewCrush(name, age, date));
  } catch (err) {
    console.error(err);
  }
});

async function updateCrush(id, name, age, date) {
  const data = await returnData();

  const updatedCrushList = data.map((currentCrush) => {
    if (Number(id) === currentCrush.id) {
      return {
        id: Number(id),
        name,
        age,
        date,
      };
    }
    return currentCrush;
  });

  const convertUpdatedCrushList = JSON.stringify(updatedCrushList, null, 2);
  await fs.promises.writeFile(crush, convertUpdatedCrushList);
  return updatedCrushList.find((currentCrush) => Number(id) === currentCrush.id);
}

app.put('/crush/:id', checkAuthorization, async (req, res) => {
  const { id } = req.params;
  const { name, age, date } = req.body;

  const testNameResult = testName(name, 'name');
  if (testNameResult.error) {
    return res.status(INVALID_REQUEST).json({ message: testNameResult.message });
  }
  const testAgeResult = testAge(age, 'age');
  if (testAgeResult.error) {
    return res.status(INVALID_REQUEST).json({ message: testAgeResult.message });
  }
  const testDateResult = testDate(date, 'date');
  if (testDateResult.error) {
    return res.status(INVALID_REQUEST).json({ message: testDateResult.message });
  }
  const result = await updateCrush(id, name, age, date);
  return res.status(SUCCESS).json(result);
});

app.listen(PORT, () => { console.log('Online'); });
