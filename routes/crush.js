const express = require('express');
const rescue = require('express-rescue');
const fs = require('fs');
const middlewares = require('../middleware');

const app = express();
app.use(middlewares.logMiddleware);

const fileCrush = () => {
  const crushJson = fs.readFileSync(`${__dirname}/../crush.json`);
  return JSON.parse(crushJson.toString('utf-8'));
};

app.get('/', (req, res) => {
  const data = fileCrush();
  return res.status(200).send(data);
});

app.use(middlewares.authMiddleware);

app.get('/search', (req, res) => {
  const response = JSON.parse(fs.readFileSync(`${__dirname}/../crush.json`, 'utf-8'));
  const { q } = req.query;
  // const crusher = fileCrush();
  if (!q || q === '') return res.status(200).json(response);
  // O método includes() determina se um array contém um determinado elemento, retornando true ou false apropriadamente
  return res.status(200).send(response.filter((element) => element.name.includes(q)));
});

app.delete('/:id', rescue(async (req, res) => {
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

app.use(middlewares.nameAgeMiddleware);
app.use(middlewares.dateMiddleware);
app.use(middlewares.rateMiddleware);

app.post('/', rescue(async (req, res) => {
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

app.put('/:id', rescue(async (req, res) => {
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

app.use(middlewares.errorMiddleware);

module.exports = app;
