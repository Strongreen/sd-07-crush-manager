const fs = require('fs');
const express = require('express');

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

module.exports = routes;