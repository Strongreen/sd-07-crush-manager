const express = require('express');
const fs = require('fs');
const {
  authMiddleware,
  dateMiddleware,
  nameAgeMiddleware,
  rateMiddleware,
} = require('../middleware/authMiddleware');

const app = express();

const fileCrush = () => {
  const crushJson = fs.readFileSync(`${__dirname}/../crush.json`);
  return JSON.parse(crushJson.toString('utf-8'));
};

app.get('/', (req, res) => {
  const data = fileCrush();
  return res.status(200).send(data);
});

app.use(authMiddleware);
app.delete('/:id', (req, res) => {
  const { id } = req.params;
  const crush = fileCrush();
  const newCrush = crush.filter((crushId) => crushId.id !== parseInt(id, 10));
  fs.writeFileSync(`${__dirname}/../crush.json`, JSON.stringify(newCrush, null, 2));
  return res.status(200).json({ message: 'Crush deletado com sucesso' });
});
app.use(nameAgeMiddleware);
app.use(dateMiddleware);
app.use(rateMiddleware);

app.post('/', (req, res) => {
  const crusher = fileCrush();
  const newCrush = { id: crusher.length + 1, ...req.body };
  const newArray = [...crusher, newCrush];
  console.log(newArray);
  return res.status(201).send(newCrush);
});

app.put('/:id', (req, res) => {
  const { id } = req.params;
  const crusher = fileCrush();
  const editCrush = { id: parseInt(id, 10), ...req.body };
  const crushI = crusher
    .map((idCrush) => (idCrush.id === parseInt(id, 10) ? editCrush : idCrush));

  fs.writeFileSync(`${__dirname}/../crush.json`, JSON.stringify(crushI, null, 2));
  return res.status(200).json(editCrush);
});

module.exports = app;
