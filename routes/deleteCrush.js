const express = require('express');
const fs = require('fs');

const { validateToken } = require('../middlewares');

const { SUCCESS } = require('../statusCode.json');

const DATAPATH = `${__dirname}/../crush.json`;

const router = express.Router();
router.use(express.json());

router.use(validateToken);

router.delete('/:id', (request, response) => {
  const crushes = fs.readFileSync(DATAPATH);
  const editId = parseInt(request.params.id, 10);
  const newCrushes = JSON.parse(crushes)
    .filter(({ id }) => id !== editId);

  fs.writeFileSync(DATAPATH, JSON.stringify(newCrushes));
  return response.status(SUCCESS).json({ message: 'Crush deletado com sucesso' });
});

module.exports = router;
