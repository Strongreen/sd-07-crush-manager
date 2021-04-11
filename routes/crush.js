const express = require('express');
const { readCrushJson } = require('./util');

const router = express.Router();

const SUCCESS = 200;
const NOT_FOUND = 404;

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

module.exports = router;