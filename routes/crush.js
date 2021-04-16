const express = require('express');

const fs = require('fs').promises;

const middlewares = require('../middlewares');

const router = express.Router();

router.post(
  '/',
  middlewares.authorizationMiddleware,
  middlewares.nameMiddleware,
  middlewares.ageMiddleware,
  middlewares.emptyDateRateMiddleware,
  middlewares.formatedDateRateMiddleware,
  middlewares.addCrushMiddleware,
);

router.get('/', async (_req, res) => {
  try {
    const data = await fs.readFile(`${__dirname}/../crush.json`);
    res.status(200).send(JSON.parse(data));
  } catch (error) {
    console.log(error);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const data = await fs.readFile(`${__dirname}/../crush.json`);
  const dataFind = JSON.parse(data).find((crush) => crush.id === Number(id));
  try {
    if (dataFind) {
      res.send(dataFind);
    } else {
      res.status(404).send({
        message: 'Crush não encontrado',
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.put('/:id', middlewares.authorizationMiddleware,
middlewares.nameMiddleware,
middlewares.ageMiddleware,
middlewares.emptyDateRateMiddleware,
middlewares.formatedDateRateMiddleware,
middlewares.editCrushMiddleware);

router.delete('/:id', middlewares.authorizationMiddleware, middlewares.excludeCrushMiddleware);

module.exports = router;
