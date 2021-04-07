const express = require('express');
const fs = require('fs');
const randtoken = require('rand-token');
const middlewares = require('../middlewares/index');

const myToken = randtoken.generate(16);

const routes = express();

const FILE = 'crush.json';

routes.get('/crush', (req, res) => {
    const file = fs.readFileSync(FILE);
    const dataCrush = file.toString('utf-8');    
    const crushData = JSON.parse(dataCrush);

   if (crushData.length !== 0) {
       res.status(200).send(crushData);
    } 
    res.status(200).send([]);
});

routes.get('/crush/:id', async (req, res) => {
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

routes.post('/login', middlewares.validationMiddleware);

routes.post('/login', (req, res) => {
  res.status(200).send({
    token: myToken,
  });
});

routes.use(middlewares.validDateFieldMiddleware);
routes.use(middlewares.testNameFieldMiddleware);
routes.use(middlewares.tokenCheckMiddleware);
routes.use(middlewares.tolkenTestFormat);
routes.use(middlewares.validAgeField);
routes.use(middlewares.validDataMiddleware);

routes.post('/crush', (req, res) => {
  const { name, age, date } = req.body;
 
  const file = fs.readFileSync(FILE);
  const stringData = file.toString('utf8');
  const data = JSON.parse(stringData);

  const id = data.length + 1;
  const latCrush = { id, name, age, date };
  const lastFile = [...data, latCrush];

fs.writeFileSync(FILE, JSON.stringify(lastFile));
res.status(201).send({ id, name, age, date });
});

routes.use(middlewares.errorMiddleware);

module.exports = routes;