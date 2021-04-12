const express = require('express');
const fs = require('fs');

const router = express.Router();
const SUCCESS = 200;
const FAILURE = 404;

// app.get e fs.promises fonte: https://github.com/tryber/sd-07-crush-manager/blob/alexandrefaustino-sd-07-crush-manager/routes/crush.js

async function readCrushes() {
  const data = await fs.promises.readFile(`${__dirname}/../crush.json`);
  return JSON.parse(data.toString('utf-8'));
}

router.get('/', async (_req, res) => {
  res.status(SUCCESS).send(await readCrushes());
});

router.get('/:id', async (req, res) => {
  const notFound = { message: 'Crush não encontrado' };
  const { id } = req.params;
  const data = await readCrushes();
  const filtered = data.find((crush) => crush.id === Number(id));
  if (filtered) {
    res.status(SUCCESS).json(filtered);
  } else {
    res.status(FAILURE).json(notFound);
  }
});

router.post('/', async (req, res) => {
  const newCrush = req.body;
  const data = await readCrushes();

  data.push(newCrush);
  fs.writeFile(`${__dirname}/../crush.json`, JSON.stringify(data));
  res.status(201).send(newCrush);
});

module.exports = router;
