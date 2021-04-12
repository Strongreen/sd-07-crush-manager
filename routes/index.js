const express = require('express');
const fs = require('fs');
const randtoken = require('rand-token');
const middlewares = require('../middlewares/index');

const myToken = randtoken.generate(16);

const route = express();

const FILE = 'crush.json';

route.get('/crush', (req, res) => {
    const file = fs.readFileSync(FILE);
    const dataCrush = file.toString('utf-8');    
    const crushData = JSON.parse(dataCrush);

   if (crushData.length !== 0) {
       res.status(200).send(crushData);
    } 
    res.status(200).send([]);
});

route.get('/crush/:id', async (req, res) => {
  const { id } = req.params;
  const file = fs.readFileSync(FILE);
  const stringData = file.toString('utf-8');
  const data = JSON.parse(stringData);

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

route.use(middlewares.validDateFieldMiddleware);
route.use(middlewares.testNameFieldMiddleware);
route.use(middlewares.tokenCheckMiddleware);
route.use(middlewares.tolkenTestFormat);
route.use(middlewares.validAgeField);
route.use(middlewares.validDataMiddleware);

route.post('/crush', (req, res) => {
  const { name, age, date } = req.body;
 
  const file = fs.readFileSync(FILE);
  const stringData = file.toString('utf8');
  const data = JSON.parse(stringData);

  const id = data.length + 1;
  const lastCrush = { id, name, age, date };
  const lastFile = [...data, lastCrush];

  fs.writeFileSync(FILE, JSON.stringify(lastFile));
  res.status(201).send({ id, name, age, date });
});

route.put('/crush/:id', (req, res) => {
  const { id } = req.params;
  const { name, age, date } = req.body;

  const file = fs.readFileSync(FILE);
  const stringData = file.toString('utf-8');
  const data = JSON.parse(stringData);

  const filterCrush = data.findIndex((crush) => crush.id === Number(id));

  if (!filterCrush || filterCrush === 0) return res.status(404).send({ message: 'Crush não encontrado' });
  res.status(201).send({ id, name, age, date });
  // const crushedited = { name, age, id: Number(id), date };
  // data.splice(filterCrush, 1, crushedited);
  // fs.writeFileSync(file, JSON.stringify(data, null, 2));
  // res.status(200).send(filterCrush);
});

route.use(middlewares.errorMiddleware);

module.exports = route;