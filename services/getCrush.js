const express = require('express');
const fs = require('fs').promises;

const router = express.Router();

const crushFile = './crush.json';

const SUCCESS = 200;

router.use(express.json());

router.get('/', async (req, res) => {
  const crushs = await fs.readFile(crushFile);
  const babado = JSON.parse(crushs);
  res.status(SUCCESS).json(babado);
});

router.get('/:id', async (req, res) => {
  const crushs = await fs.readFile(crushFile);
  const idteste = Number(req.params.id);
  const babado = JSON.parse(crushs);
  const found = await babado.find((element) => element.id === idteste);
  if (found) {
    return res.status(SUCCESS).json(found);
  }
  return res.status(404).json({
    message: 'Crush não encontrado',
  });
});

module.exports = router;
