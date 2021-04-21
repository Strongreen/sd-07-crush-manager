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

routes.route('/crush/:id')
  .get((req, res) => {
    const { id } = req.params;

    const file = fs.readFileSync(FILE);
    const dataString = file.toString('utf-8');
    const data = JSON.parse(dataString);

    const matchCrush = data.find((crush) => crush.id === Number(id));

    if (!matchCrush) return res.status(404).send({ message: 'Crush não encontrado' });

    res.status(200).send(matchCrush);
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