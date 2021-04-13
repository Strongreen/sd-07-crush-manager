const express = require('express');
const fs = require('fs');
const { dataCrushMiddleware, tokenMiddleware } = require('../middlewares');

const router = express.Router();

const readFileCrush = () => {
  const crushJson = fs.readFileSync(`${__dirname}/../crush.json`);
  return JSON.parse(crushJson.toString('utf-8'));
};

router.get('/', async (_req, res) => {
  try {
    const responseCrush = await fs.promises.readFile(`${__dirname}/../crush.json`);
    const responseCrushJSON = JSON.parse(responseCrush.toString('utf-8'));
    res.status(200).send(responseCrushJSON);
  } catch (error) {
    return error;
  }
});

router.get('/:id', (req, res) => {
  const dataCrush = JSON.parse(fs.readFileSync(`${__dirname}/../crush.json`));
  const { id } = req.params;
  
  if (dataCrush[id - 1]) {
    res.status(200).send(dataCrush[id - 1]);
  } else {
    res.status(404).send({
      message: 'Crush não encontrado',
    });
  }
});

router.use(tokenMiddleware);
router.use(dataCrushMiddleware);

router.post('/', async (req, res) => {
  const dataCrush = JSON.parse(fs.readFileSync(`${__dirname}/../crush.json`));
  const { name, age, date } = req.body;
  const newCrushObject = { id: dataCrush.length + 1, name, age, date };
  const crushDocument = [...dataCrush, newCrushObject];

  try {
    await fs.promises.writeFile(`${__dirname}/../crush.json`, JSON.stringify(crushDocument));
    return res.status(201).send(newCrushObject);
  } catch (error) {
    return error;
  }
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const dataCrush = readFileCrush();
  const idCrushUpdated = parseInt(id, 10);
  const updateCrush = { id: idCrushUpdated, ...req.body };
  // Lógica vista no Plantão de dúvidas trazida pelo Cleber Fontinele
  const crushDocument = dataCrush
    .map((CurCrush) => (CurCrush.id === idCrushUpdated ? updateCrush : CurCrush));

  fs.writeFileSync(`${__dirname}/../crush.json`, JSON.stringify(crushDocument, null, 2));
  return res.status(200).json(updateCrush);
});

module.exports = router;
