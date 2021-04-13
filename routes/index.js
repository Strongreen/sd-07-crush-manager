const express = require('express');
const fs = require('fs');
const randtoken = require('rand-token');
const middlewares = require('../middlewares/index');
const useMiddleware = require('../helpers/index');

const myToken = randtoken.generate(16);

const route = express();

const FILE = 'crush.json';

route.get('/crush', (req, res) => {
    const file = fs.readFileSync(FILE, { encoding: 'utf-8', flag: 'r' });
    const crushData = JSON.parse(file);

   if (crushData.length !== 0) {
       res.status(200).send(crushData);
    } 
    res.status(200).send([]);
});

route.get('/crush/:id', async (req, res) => {
  const { id } = req.params;
  const file = fs.readFileSync(FILE, { encoding: 'utf-8', flag: 'r' });
  const data = JSON.parse(file);

  const filterCrush = data.find((crush) => crush.id === Number(id));

  if (!filterCrush || filterCrush === 0) {
     res.status(404).send(
        {
          message: 'Crush não encontrado',
        },
    );
  }
  
  res.status(200).send(filterCrush);
});

route.post('/login', middlewares.validationMiddleware);

route.post('/login', (req, res) => {
  res.status(200).send({
    token: myToken,
  });
});

const middlewareValidation = useMiddleware();

route.post('/crush', middlewareValidation, (req, res) => {
  const { name, age, date } = req.body;
  const file = fs.readFileSync(FILE, { encoding: 'utf-8', flag: 'r' });

  const data = JSON.parse(file);

  const id = data.length + 1;
  const lastCrush = { id, name, age, date };
  const lastFile = [...data, lastCrush];

  fs.writeFileSync(FILE, JSON.stringify(lastFile));
  res.status(201).send({ id, name, age, date });
});

route.put('/crush/:id', middlewareValidation, (req, res) => {
  const { id } = req.params;
  const { name, age, date } = req.body;

  const file = fs.readFileSync(FILE, { encoding: 'utf-8', flag: 'r' });
  const data = JSON.parse(file);

  const getItem = data.filter((item) => item.id !== Number(id));
  
  const lastCrush = { id: Number(id), name, age, date };
  const lastFile = [...getItem, lastCrush];
  
  fs.writeFileSync(FILE, JSON.stringify(lastFile));
  res.status(200).send({ id: Number(id), name, age, date });
});

module.exports = route;