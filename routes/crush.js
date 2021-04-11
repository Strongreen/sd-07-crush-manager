const express = require('express');
const authToken = require('../middlewares/authToken');
const { 
  validateNameSize,
  validateAge,
  validateDate,
  validateRate } = require('../middlewares/utils');
const { readCrushJson, throwError, writeCrush } = require('./util');

const router = express.Router();

const SUCCESS = 200;
const NOT_FOUND = 404;
const BAD_REQUEST = 400;
const CREATED = 201;

router.get('/', async (_req, res, next) => {
  try {
    const file = await readCrushJson();
    return res.status(SUCCESS).send(file);
  } catch (error) {
    return next({ status: NOT_FOUND, resp: error.message });
  }  
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const file = await readCrushJson();
    const idFinder = file.find((elem) => +elem.id === +id);
    if (!idFinder) throw new Error('Crush não encontrado');
    return res.status(SUCCESS).send(idFinder);
  } catch (error) {
    return next({ status: NOT_FOUND, resp: error.message });
  }
});

router.use(authToken);

router.post('/', async (req, res, next) => {
  try {
    const { name, age, date: { datedAt, rate } } = req.body;
    throwError(!name, 'O campo "name" é obrigatório');
    throwError(!validateNameSize(name), 'O "name" deve ter pelo menos 3 caracteres');
    throwError(!age, 'O campo "age" é obrigatório');
    throwError(!validateAge(age), 'O crush deve ser maior de idade');
    throwError(!datedAt || !rate, 
      'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
    throwError(!validateDate(datedAt), 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"');
    throwError(!validateRate(rate), 'O campo "rate" deve ser um inteiro de 1 à 5');
    const respCrush = await writeCrush(req.body);
    res.status(CREATED).send(respCrush);
  } catch (error) {
    return next({ status: BAD_REQUEST, resp: error.message });
  }
});

module.exports = router;