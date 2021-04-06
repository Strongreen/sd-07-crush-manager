const express = require('express');
const fs = require('fs');

const {
  validateDate,
  validateRate,
  validateNameCrush,
  validateAgeCrush,
  validateToken,
} = require('../middlewares');

const { CREATED } = require('../statusCode.json');

const DATAPATH = `${__dirname}/../crush.json`;

const router = express.Router();
router.use(express.json());

router.use(validateToken);
router.use(validateNameCrush);
router.use(validateAgeCrush);
router.use(validateDate);
router.use(validateRate);

router.post('/', (request, response) => {
  const crushes = fs.readFileSync(DATAPATH);
  const newId = JSON.parse(crushes).length + 1;

  const newCrushes = [...JSON.parse(crushes), { ...request.body, id: newId }];
  fs.writeFileSync(`${__dirname}/crush.json`, JSON.stringify(newCrushes));
  response.status(CREATED).json({ id: newId, ...request.body });
});

module.exports = router;
