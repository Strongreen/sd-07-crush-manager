const express = require('express');
const fs = require('fs');
const rescue = require('express-rescue');
const crush = require('../crush.json');
const authMiddleware = require('../middlewares/authMiddleware');
const validatingCrushesMiddleware = require('../middlewares/validCrushesMiddleware');

const app = express();
const SUCCESS = 200;
const FAIL = 404;

async function getCrushes() {
  // sempre tentar trbalhar com promisses e não callbacks
  // queremos transfromar o fluxo assincrono em sincrono
  // por isso além do fs.promises usamos async await
  try {
    const content = await fs.promises.readFile('./crush.json', 'utf-8')
      .then((response) => JSON.parse(response));
    return content;
  } catch (error) {
    console.error(error.message);
  }
}

app.get('/', async (_req, res) => {
  const crushes = await getCrushes();
  if (!crushes) return res.status(200).send([]);
  res.status(200).send(crushes);
});

app.get('/:id', async (req, res) => {
  const { id } = req.params;
  const crushes = await getCrushes();
  const findCrushes = crushes.find((cru) => parseFloat(cru.id) === parseFloat(id));
  if (!findCrushes) {
    res.status(FAIL).send({ message: 'Crush não encontrado' });
  } else {
    res.status(SUCCESS).send(findCrushes);
  }
});

async function sendCrushes(newCrush) {
  try {
    const content = await fs.promises
    .writeFile(`${__dirname}/../crush.json`, JSON.stringify(newCrush));
    return content;
    // ver esse return content na ogica do cavalcante
  } catch (error) {
    console.error(error.message);
  }
}
// logica com ajuda da aula do Lucas Cavalcante 26.5

app.use(express.json());
// daqui para baixo todas as rotas sofrerão alteração do middleware de autenticação

app.post('/', authMiddleware, validatingCrushesMiddleware.validatingAgeOfCrushes,
validatingCrushesMiddleware.validatingNameOfCrushes,
validatingCrushesMiddleware.validatingRatesOfCrushes,
validatingCrushesMiddleware.validatingDateAndRatesOfCrushes,
validatingCrushesMiddleware.validatingDateFormatOfCrushes,
rescue(async (req, res) => {
  const size = crush.length;
  const { name, age, date } = req.body;
  const { datedAt, rate } = date;
  crush[size] = {
    id: size + 1,
    name,
    age,
    date: {
      datedAt,
      rate,
    },
  };
    sendCrushes(crush);
    return res.status(201).send(crush[crush.length - 1]);
}));
// logica com ajuda da aula do Lucas Cavalcante 26.5

  app.put('/:id', authMiddleware,
  validatingCrushesMiddleware.validatingNameOfCrushes,
  validatingCrushesMiddleware.validatingAgeOfCrushes,
  validatingCrushesMiddleware.validatingDateAndRatesOfCrushes,
validatingCrushesMiddleware.validatingDateFormatOfCrushes,
validatingCrushesMiddleware.validatingRatesOfCrushes,
   rescue(async (req, res) => {
  const { id } = req.params;
  const { name, age, date } = req.body;
  crush[id - 1].name = name;
  crush[id - 1].age = age;
  crush[id - 1].date = date;
    sendCrushes(crush);
    return res.status(200).send(crush[id - 1]);
  }));
module.exports = app;