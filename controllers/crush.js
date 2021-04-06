const express = require('express');
const fs = require('fs');

const router = express.Router();

const crush = './crush.json';

const SUCCESS = 200;
const NOT_FIND = 404;
const UNAUTHORIZED = 401;
const CREATED = 201;
const INVALID_REQUEST = 400;

async function returnData() {
  const data = await fs.promises.readFile(crush, 'utf-8');
  return JSON.parse(data);
}

router.get('/', async (_req, res) => {
  const data = await returnData();
  
  return res.status(SUCCESS).json(data);
});

async function testExistingId(id) {
  const data = await returnData();
  return data.filter((currentCrush) => currentCrush.id === Number(id));
}

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const getCrushById = await testExistingId(id);
  if (getCrushById.length < 1) {
    return res.status(NOT_FIND).json({ message: 'Crush não encontrado' });
  }

  return res.status(SUCCESS).json(getCrushById[0]);
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
  const newCrushObject = {
    id: lastId + 1,
    name,
    age,
    date,
  };

  data.push(newCrushObject);
  const convertUpdatedCrushList = JSON.stringify(data, null, 2);
  await fs.promises.writeFile(crush, convertUpdatedCrushList);

  return newCrushObject;
}

router.post('/', checkAuthorization, async (req, res) => {
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
  return res.status(CREATED).json(await createNewCrush(name, age, date));
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

router.put('/:id', checkAuthorization, async (req, res) => {
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

router.delete('/:id', checkAuthorization, async (req, res) => {
  const { id } = req.params;
  const data = await returnData();

  const updatedCrushList = data.filter((currentCrush) => currentCrush.id === Number(id));
  const convertUpdatedCrushList = JSON.stringify(updatedCrushList, null, 2);
  await fs.promises.writeFile(crush, convertUpdatedCrushList);
  return res.status(SUCCESS).json({ message: 'Crush deletado com sucesso' });
});

module.exports = router;
