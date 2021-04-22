const fs = require('fs');
const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');
const paramsMiddleware = require('../middleware/paramsMiddleware');

const routes = express.Router();

const FILE = 'crush.json';

routes.get('/crush', (req, res) => {
  const file = fs.readFileSync(FILE);
  const dataString = file.toString('utf-8');
  const data = JSON.parse(dataString);

  if (!data.length) return res.status(200).send([]);

  res.status(200).send(data);
});

routes.get('/crush/search', authMiddleware, (req, res) => {
  const { q } = req.query;

  if (!q) res.redirect('/crush');

  const file = fs.readFileSync(FILE);
  const dataString = file.toString('utf8');
  const data = JSON.parse(dataString);

  const findCrushes = data.filter((crush) => crush.name.includes(q));

  if (!findCrushes) return res.status(200).send([]);

  res.status(200).send(findCrushes);
});

routes.route('/crush/:id')
  .get((req, res) => {
    const { id } = req.params;

    const file = fs.readFileSync(FILE);
    const dataString = file.toString('utf-8');
    const data = JSON.parse(dataString);

    const matchCrush = data.find((crush) => crush.id === Number(id));

    if (!matchCrush) return res.status(404).send({ message: 'Crush não encontrado' });

    res.status(200).send(matchCrush);
  })
  .delete(authMiddleware, (req, res) => {
    const { id } = req.params;

    const file = fs.readFileSync(FILE);
    const dataString = file.toString('utf8');
    const data = JSON.parse(dataString);

    const newCrush = data.filter((crush) => crush.id !== Number(id));

    fs.writeFileSync(FILE, JSON.stringify(newCrush, null, 2));

    res.status(200).send({ message: 'Crush deletado com sucesso' });
  })
  .put(authMiddleware, paramsMiddleware, (req, res) => {
    const { id } = req.params;
    const { name, age, date } = req.body;

    const file = fs.readFileSync(FILE);
    const dataString = file.toString('utf8');
    const data = JSON.parse(dataString);

    const crushIndex = data.findIndex((crush) => crush.id === Number(id));

    if (crushIndex === -1) return res.status(404).send({ message: 'Crush não encontrado' });

    const newCrush = { name, age, id: Number(id), date };
    data.splice(crushIndex, 1, newCrush);

    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

    res.status(200).send(newCrush);
  });

routes.post('/crush', authMiddleware, paramsMiddleware, (req, res) => {
  const { name, age, date } = req.body;

  const file = fs.readFileSync(FILE);
  const stringData = file.toString('utf8');
  const data = JSON.parse(stringData);

  const id = data[data.length - 1].id + 1;
  const newCrush = { name, age, id, date };
  const newFile = [...data, newCrush];

  fs.writeFileSync(FILE, JSON.stringify(newFile, null, 2));

  res.status(201).send({ name, age, id, date });
});
module.exports = routes;