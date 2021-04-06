const express = require('express');
const fs = require('fs').promises;

const SUCCESS = 200;

const app = express.Router();
const ID = '/:id';

// --------------------- Middleware ---------------------
const tokenMiddleware = require('../middlewares/tokenMiddleware');
const nameMiddleware = require('../middlewares/nameMiddleware');
const ageMiddleware = require('../middlewares/ageMiddleware');
const dateAtRateMiddleware = require('../middlewares/dateAtRateMiddleware');
const dateMiddleware = require('../middlewares/dateMiddleware');

const lerArquivo = async () => {
    const arquivo = await fs.readFile('./crush.json', 'utf-8');
    return JSON.parse(arquivo);
  };
  
  const escreverArquivo = async (addAlgo) => {
    await fs.writeFile('crush.json', JSON.stringify(addAlgo));
  };

  const add = async (req, res) => {
    const { name, date } = req.body;
    const age = parseInt(req.body.age, 10);
    const crushJson = await lerArquivo();
    const novoCrush = {
      id: crushJson.length + 1,
      name,
      age,
      date,
    };
    const novoArquivoCrush = [...crushJson, novoCrush];
    await escreverArquivo(novoArquivoCrush);
    return res.status(201).send(novoCrush);
  };

app.get('/', async (_req, res) => {
  const crushJson = await lerArquivo();
  if (crushJson) return res.status(SUCCESS).send(crushJson);
  return res.status(SUCCESS).send(null);
});

app.get('/search', tokenMiddleware, async (req, res) => {
  const searchTerm = req.query.q;
  const crushJson = await lerArquivo();
  const crushFiltrado = crushJson.filter((item) =>
    item.name.includes(searchTerm));
  switch (true) {
    case !searchTerm:
      return res.status(SUCCESS).send(null);
    default:
      return res.status(SUCCESS).json(crushFiltrado);
  }
});

app.get(ID, async (req, res) => {
  const crushJson = await lerArquivo();
  const { id } = req.params;
  const number = 1;
  const filtroId = crushJson.find((item) => item.id === id * number);
  // nao da para usar o filter porque me retorna um array vazio se nada for encontrado
  // o find me retorna false se nada for encontrado
  switch (true) {
    case !filtroId:
      return res.status(404).json({ message: 'Crush não encontrado' });
    default:
      return res.status(200).send(filtroId);
  }
});

app.delete(ID, tokenMiddleware, async (req, res) => {
  const { id } = req.params;
  const crushJson = await lerArquivo();
  const novoArquivoCrush = crushJson.filter(
    (item) => item.id !== parseInt(id, 10),
  );
  await escreverArquivo(novoArquivoCrush);
  return res.status(200).send({ message: 'Crush deletado com sucesso' });
});

app.use(tokenMiddleware);
app.use(nameMiddleware);
app.use(ageMiddleware);
app.use(dateAtRateMiddleware);
app.use(dateMiddleware);
app.post('/', (req, res) => {
  add(req, res);
});

app.put(ID, async (req, res) => {
  const { name, age, date } = req.body;
  const { id } = req.params;
  const crushJson = await lerArquivo();
  const crushFiltradoId = crushJson.filter(
    (item) => item.id === parseInt(id, 10),
  );
  const novoCrush = { name, age, id: crushFiltradoId[0].id, date };
  return res.status(200).send(novoCrush);

  // const novoArquivoCrush = crushJson.filter((item) => item.id !== parseInt(id, 10));
});

module.exports = app; 