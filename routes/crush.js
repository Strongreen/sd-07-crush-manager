const fs = require('fs');
const express = require('express');
const middlewares = require('../middlewares');
const midd = require('../helpers');

const useMidd = midd();
const FILE = './crush.json';
const router = express.Router();

// const readCrushFile = async () => {
//   const content = await fs.readFile(path.resolve(__dirname, '..', 'crush.json'));
//   return JSON.parse(content.toString('utf-8'));
// };
const pathName = '/crush/:id';
router.get('/crush', (req, res) => {
  const file = fs.readFileSync(FILE, { encoding: 'utf-8', flag: 'r' });
  const data = JSON.parse(file);

  if (data.length !== 0) {
    res.status(200).send(data);
  }
  res.status(200).send([]);
});

router.get(pathName, (req, res) => {
  const { id } = req.params;
  const file = fs.readFileSync(FILE, { encoding: 'utf-8', flag: 'r' });
  const data = JSON.parse(file);

  const filterCrush = data.find((crush) => crush.id === Number(id));
  if (!filterCrush) {
    res.status(404).json({ message: 'Crush não encontrado' });
  } 
  return res.status(200).json(filterCrush);
});

router.post('/crush', useMidd, (req, res) => {
  const { name, age, date } = req.body;

  const file = fs.readFileSync(FILE, { encoding: 'utf-8', flag: 'r' });
  const data = JSON.parse(file);

  const id = data.length + 1;
  const newCrush = { id, name, age, date };
  const Itens = [...data, newCrush];

  fs.writeFileSync(FILE, JSON.stringify(Itens));

  return res.status(201).send({ id, name, age, date });
});

router.put(pathName, useMidd, (req, res) => {
  const { id } = req.params;
  const { name, age, date } = req.body;
  const file = fs.readFileSync(FILE, { encoding: 'utf-8', flag: 'r' });
  const data = JSON.parse(file);
  const filterEd = data.filter((item) => item.id !== Number(id));
  
  const crushs = { id: Number(id), name, age, date };
  const crushArray = [...filterEd, crushs];

  fs.writeFileSync(FILE, JSON.stringify(crushArray));

  return res.status(200).send({ id: Number(id), name, age, date });
});
// router.use(middlewares.tokennNot);
// router.use(middlewares.tokenInvalido);

router.delete(pathName, middlewares.tokennNot, middlewares.tokenInvalido, (req, res) => {
  const { id } = req.params;
  const file = fs.readFileSync(FILE, { encoding: 'utf-8', flag: 'r' });
  const data = JSON.parse(file);

  const filterEd = data.filter((item) => item.id !== Number(id));
  fs.writeFileSync(FILE, JSON.stringify(filterEd));

  res.status(200).send({ message: 'Crush deletado com sucesso' });
});

router.use(middlewares.errorMiddlewares);
module.exports = router;