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

app.get('/search', authMiddleware, async (req, res) => {
  const term = req.query.q;
  const crushes = await getCrushes();
  const searchTerm = crushes.filter((csh) => csh.name.includes(term));
  if (!term || term === '') {
    return res.status(200).json(crushes);
  } if (searchTerm.length === 0) {
    return res.status(200).json([]);
  }
  return res.status(200).json(searchTerm);
});

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
validatingCrushesMiddleware.validatingDateAndRatesOfCrushes,
validatingCrushesMiddleware.validatingRatesOfCrushes,
validatingCrushesMiddleware.validatingDateFormatOfCrushes,
rescue(async (req, res) => {
  const { name, age, date } = req.body;
  const crushes = await getCrushes();
  const size = crushes.length;
  crush[size] = {
    id: size + 1,
    name,
    age,
    date,
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

  app.delete('/:id', authMiddleware,
  rescue(async (req, res) => {
 const { id } = req.params;
 const index = id - 1;
 crush.splice(index, 1);
 sendCrushes(crush);
 return res.status(200).send({ message: 'Crush deletado com sucesso' });
 }));

module.exports = app;