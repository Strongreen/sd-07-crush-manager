const express = require('express');
const fs = require('fs').promises;
const auth = require('../middlewares/auth');

const router = express.Router();

const OK = 200;
const FAIL = 404;
const BAD_REQ = 400;
const POSTED = 201;

const readFiles = async () => {
  const data = JSON.parse(await fs.readFile(`${__dirname}/../crush.json`));
  return data;
};

const writeFsFile = async (file) => (
  fs.writeFile(`${__dirname}/../crush.json`, JSON.stringify(file))
);

const crushFinder = (allCrushes, crushId) => (
  allCrushes.find((crush) => crush.id === Number(crushId))
);

const throwError = (check, message) => {
  if (check) {
    throw new Error(message);
  }
};

const postCrush = async (crush) => {
  const allCrushes = await readFiles();
  const newCrush = { id: allCrushes.length + 1, ...crush };
  allCrushes.push(newCrush);
  await writeFsFile(allCrushes);
  return newCrush;
};

const putCrush = async (newCrush, crushId) => {
  const allCrushes = await readFiles();
  const newCrushes = allCrushes.map((crush) => {
    if (Number(crush.id) === Number(crushId)) {
      return { id: crush.id, ...newCrush };
    }
    return crush;
  });
  
  await writeFsFile(newCrushes);
  
  return newCrushes.find((c) => +c.id === +crushId);
};

const deleteCrush = async (id) => {
  const allCrushes = await readFiles();
  const newCrushes = allCrushes.filter((elem) => +elem.id !== +id);

  await writeFsFile(newCrushes);
};

router.get('/', async (_req, res, next) => {
  try {
    return res.status(OK).send(await readFiles());
  } catch (error) {
    return next({ status: FAIL, resp: error.message });
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const failMsg = 'Crush não encontrado';
    const data = await readFiles();
    const theCrush = crushFinder(data, id);

    throwError(!theCrush, failMsg);
    return res.status(OK).json(theCrush);
  } catch (error) {
    return next({ status: FAIL, resp: error.message });
  }
});

const validateNewCrushName = (name) => name.length > 3;

const validateNewCrushAge = (age) => age > 18;

const validateNewCrushDate = (date) => {
  const regexDate = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  return regexDate.test(date);
};

const validateNewCrushRate = (rate) => rate >= 1 && rate <= 5;

router.use(auth);

const dateErrorMessage = 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';
const rateErrorMessage = 'O campo "rate" deve ser um inteiro de 1 à 5';

router.post('/', async (req, res, next) => {
  try {
    const { name, age, date } = req.body;
    throwError(!date, dateErrorMessage);
    const { datedAt, rate } = date;
    throwError(!name, 'O campo "name" é obrigatório');
    throwError(!datedAt || !rate, dateErrorMessage);
    throwError(!age, 'O campo "age" é obrigatório');
    throwError(!validateNewCrushName(name), 'O "name" deve ter pelo menos 3 caracteres');
    throwError(!validateNewCrushAge(age), 'O crush deve ser maior de idade');
    throwError(!validateNewCrushDate(datedAt), 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"');
    throwError(!validateNewCrushRate(rate), rateErrorMessage);
    const response = await postCrush(req.body);
    res.status(POSTED).send(response);
  } catch (error) {
    return next({ status: BAD_REQ, resp: error.message });
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, age, date } = req.body;
    throwError(!date, dateErrorMessage);
    if (date.rate === Number(0)) throw new Error(rateErrorMessage);
    throwError(!name, 'O campo "name" é obrigatório');
    throwError(!date.datedAt || !date.rate, dateErrorMessage);
    throwError(!validateNewCrushRate(date.rate), rateErrorMessage);
    throwError(!age, 'O campo "age" é obrigatório');
    throwError(!validateNewCrushName(name), 'O "name" deve ter pelo menos 3 caracteres');
    throwError(!validateNewCrushAge(age), 'O crush deve ser maior de idade');
    throwError(!validateNewCrushDate(date.datedAt),
     'O campo "datedAt" deve ter o formato "dd/mm/aaaa"');
    const response = await putCrush(req.body, id);
    res.status(OK).send(response);
  } catch (error) {
    return next({ status: BAD_REQ, resp: error.message });
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteMessage = { message: 'Crush deletado com sucesso' };
    await deleteCrush(id);
    res.status(OK).send(deleteMessage);
  } catch (error) {
    return next({ status: BAD_REQ, resp: error.message });
  }
});

module.exports = router;
