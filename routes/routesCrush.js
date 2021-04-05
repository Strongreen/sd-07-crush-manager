const fs = require('fs');
const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');
const paramsMiddleware = require('../middleware/paramsMiddleware');

const routes = express.Router();

const FILE_NAME = 'crush.json';

routes.get('/crush', (req, res) => {
  const file = fs.readFileSync(FILE_NAME);
  const stringData = file.toString('utf8');
  const data = JSON.parse(stringData);

  if (!data.length) return res.status(200).send([]);

  res.status(200).send(data);
});

routes.get('/crush/search', authMiddleware, (req, res) => {
  const { q } = req.query;

  if (!q) res.redirect('/crush');

  const file = fs.readFileSync(FILE_NAME);
  const stringData = file.toString('utf8');
  const data = JSON.parse(stringData);

  const foundCrushes = data.filter((crush) => crush.name.includes(q));

  if (!foundCrushes) return res.status(200).send([]);

  res.status(200).send(foundCrushes);
});

routes.route('/crush/:id')
  .get((req, res) => {
    const { id } = req.params;

    const file = fs.readFileSync(FILE_NAME);
    const stringData = file.toString('utf8');
    const data = JSON.parse(stringData);

    const foundCrush = data.find((crush) => crush.id === Number(id));

    if (!foundCrush) return res.status(404).send({ message: 'Crush não encontrado' });

    res.status(200).send(foundCrush);
  })
  .put(authMiddleware, paramsMiddleware, (req, res) => {
    const { id } = req.params;
    const { name, age, date } = req.body;
  
    const file = fs.readFileSync(FILE_NAME);
    const stringData = file.toString('utf8');
    const data = JSON.parse(stringData);
  
    const foundCrushIndex = data.findIndex((crush) => crush.id === Number(id));
  
    if (foundCrushIndex === -1) return res.status(404).send({ message: 'Crush não encontrado' });
  
    const editedCrush = { name, age, id: Number(id), date };
    data.splice(foundCrushIndex, 1, editedCrush);
  
    fs.writeFileSync(FILE_NAME, JSON.stringify(data, null, 2));
  
    res.status(200).send(editedCrush);
  })
  .delete(authMiddleware, (req, res) => {
    const { id } = req.params;
  
    const file = fs.readFileSync(FILE_NAME);
    const stringData = file.toString('utf8');
    const data = JSON.parse(stringData);
  
    const newCrushFile = data.filter((crush) => crush.id !== Number(id));
  
    fs.writeFileSync(FILE_NAME, JSON.stringify(newCrushFile, null, 2));
  
    res.status(200).send({ message: 'Crush deletado com sucesso' });
  });

routes.post('/crush', authMiddleware, paramsMiddleware, (req, res) => {
  const { name, age, date } = req.body;

  const file = fs.readFileSync(FILE_NAME);
  const stringData = file.toString('utf8');
  const data = JSON.parse(stringData);

  const id = data[data.length - 1].id + 1;
  const newCrush = { name, age, id, date };
  const newFile = [...data, newCrush];

  fs.writeFileSync(FILE_NAME, JSON.stringify(newFile, null, 2));

  res.status(201).send({ name, age, id, date });
});

module.exports = routes;
