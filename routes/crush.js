const express = require('express');
const rescue = require('express-rescue');
const fs = require('fs');
const middlewares = require('../middleware');

const router = express.Router();
router.use(middlewares.logMiddleware);

const fileCrush = () => {
  const crushJson = fs.readFileSync(`${__dirname}/../crush.json`);
  return JSON.parse(crushJson.toString('utf-8'));
};

router.get('/', (req, res) => {
  const data = fileCrush();
  return res.status(200).send(data);
});

router.get('/search', middlewares.authMiddleware, (req, res) => {
  const response = JSON.parse(fs.readFileSync(`${__dirname}/../crush.json`, 'utf-8'));
  const { q } = req.query;
  if (!q || q === '') return res.status(200).json(response);
  // O método includes() determina se um array contém um determinado elemento, retornando true ou false apropriadamente
  return res.status(200).send(response.filter((element) => element.name.includes(q)));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const data = JSON.parse(fs.readFileSync('./crush.json', 'utf8'));
  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/parseInt
  const filteredCrush = data.find((crush) => crush.id === parseInt(id, 10));
  if (filteredCrush) {
    return res.status(200).json(filteredCrush);
  }
  res.status(404).json({ message: 'Crush não encontrado' });
});

router.delete('/:id', middlewares.authMiddleware, rescue(async (req, res) => {
  const { id } = req.params;
  const crush = fileCrush();
  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/parseInt
  const newCrush = crush.filter((crushId) => crushId.id !== parseInt(id, 10));
  try {
    await fs.writeFileSync(`${__dirname}/../crush.json`, JSON.stringify(newCrush, null, 2));
    return res.status(200).json({ message: 'Crush deletado com sucesso' });
  } catch (error) {
    throw new Error(error);
  }
}));

router.use(middlewares.authMiddleware);
router.use(middlewares.nameAgeMiddleware);
router.use(middlewares.dateMiddleware);
router.use(middlewares.rateMiddleware);

router.post('/', rescue(async (req, res) => {
  const crusher = fileCrush();
  const newCrush = { id: crusher.length + 1, ...req.body };
  const newArray = [...crusher, newCrush];
  try {
    await fs.writeFileSync(`${__dirname}/../crush.json`, JSON.stringify(newArray, null, 2));
    return res.status(201).send(newCrush);
  } catch (error) {
    throw new Error(error);
  }
}));

router.put('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const crusher = fileCrush();
  const editCrush = { id: parseInt(id, 10), ...req.body };
  const crushI = crusher
    // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/parseInt
    // lógica do map do Carlos Souza Turma 07
    .map((idCrush) => (idCrush.id === parseInt(id, 10) ? editCrush : idCrush));
  try {
    await fs.writeFileSync(`${__dirname}/../crush.json`, JSON.stringify(crushI, null, 2));
    return res.status(200).json(editCrush);
  } catch (error) {
    throw new Error(error);
  }
}));

router.use(middlewares.errorMiddleware);

module.exports = router;
