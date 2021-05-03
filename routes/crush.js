// uso da função findIndex() sugerida por Lorena Goes

const express = require('express');
const fs = require('fs').promises;
const {
  nameMiddleware,
  ageAuthMiddleware,
  dateAuthMiddleware,
  datedAtMiddle,
  rateMiddle,
  authMiddleware,
} = require('../middlewares/authToken');

const crush = express.Router();

function readCrushesFile() {
  return fs.readFile(`${__dirname}/../crush.json`, 'utf-8')
  .then((content) => JSON.parse(content))
  .catch((err) => console.log(err.message));
}

const writeCrushesFile = async (content) => (
  fs.writeFile(
    `${__dirname}/../crush.json`,
    JSON.stringify(content),
    'utf8',
    (err) => {
      if (err) throw err;
    },
  )
);

const SUCCESS = 200;

const NOT_FOUND = 404;

crush.get('/:id', async (request, response) => {
  try {
    const result = await readCrushesFile();
    const crushId = result.find((crushData) => crushData.id === Number(request.params.id));
    if (crushId) {
      return response.status(SUCCESS).send(crushId);
    }
    const message = {
      message: 'Crush não encontrado',
    };
    return response.status(NOT_FOUND).send(message);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

crush.get('/', async (request, response) => {
  try {
    const result = await readCrushesFile();
    response.status(SUCCESS).send(result);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

crush.post(
  '/',
  authMiddleware,
  nameMiddleware,
  ageAuthMiddleware,
  dateAuthMiddleware,
  datedAtMiddle,
  rateMiddle, async (req, res) => {
  const currentCrushes = await readCrushesFile();
  const { name, age, date } = req.body;
  const newCrushId = currentCrushes.length + 1;
  const newCrush = {
    id: newCrushId,
    name,
    age,
    date,
  };
  try {
    const newCrushesArray = [...currentCrushes, newCrush];
    await writeCrushesFile(newCrushesArray);
    return res.status(201).send(newCrush);
  } catch (err) {
    res.status(500).send(`Deu ruim. Mensagem: ${err.message}`);
  }
},
);

crush.put('/:id',
  authMiddleware,
  nameMiddleware,
  ageAuthMiddleware,
  dateAuthMiddleware,
  datedAtMiddle,
  rateMiddle, async (req, res) => {
  const result = await readCrushesFile();
  const { id } = req.params;
  const { name, age, date } = req.body;
  const crushIndex = result
    .findIndex((crushData) => crushData.id === Number(id));
  result[crushIndex] = { id: Number(id), name, age, date };
  try {
    await writeCrushesFile(result);
    return res.status(SUCCESS).send(result[crushIndex]);
  } catch (err) {
    const message = {
      message: 'Crush não encontrado',
    };
    return res.status(NOT_FOUND).send(message);
  }
});

crush.delete('/:id', authMiddleware, async (req, res) => {
  const result = await readCrushesFile();
  const { id } = req.params;
  const crushIndex = result
    .findIndex((crushData) => crushData.id === Number(id));
  result.splice(crushIndex, 1); 
  try {
    await writeCrushesFile(result);
    const message = {
      message: 'Crush deletado com sucesso',
    };
    return res.status(SUCCESS).send(message);
  } catch (err) {
    return res.status(NOT_FOUND).send(err.message);
  }
});

module.exports = crush;
