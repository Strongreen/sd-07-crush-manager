const express = require('express');
const fs = require('fs');

const {
  validateRate,
  validateDate,
  validateNameCrush,
  validateAgeCrush,
  validateToken,
} = require('../middlewares');

const { SUCCESS } = require('../statusCode.json');

const DATAPATH = `${__dirname}/../crush.json`;

const router = express.Router();
router.use(express.json());

router.use(validateToken);
router.use(validateNameCrush);
router.use(validateAgeCrush);
router.use(validateRate);
router.use(validateDate);

router.put('/:id', (request, response) => {
  const crushes = fs.readFileSync(DATAPATH);
  const editId = parseInt(request.params.id, 10);
  
  let newCrushes = JSON.parse(crushes)
    .filter(({ id }) => id !== editId);
  newCrushes = [...newCrushes, { ...request.body, id: editId }];
  fs.writeFileSync(DATAPATH, JSON.stringify(newCrushes));
  response.status(SUCCESS).json({ id: editId, ...request.body });
});

module.exports = router;
