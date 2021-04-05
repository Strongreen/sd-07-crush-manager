const express = require('express');
const rescue = require('express-rescue');
const { readFile, whriteFile } = require('../helpers/util');
const middlewares = require('../middlewares');

const router = express.Router();

router.use(middlewares.validateTokenMiddleware);
router.delete('/:id', rescue(async (req, res) => {
  const { id } = req.params;

  const crushes = await readFile('crush');
  await whriteFile('crush', crushes.filter((crush) => crush.id === parseInt(id, 10)));
  res.status(200).send({ message: 'Crush deletado com sucesso' });
}));

module.exports = router;
