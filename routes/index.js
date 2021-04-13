const express = require('express');
const fs = require('fs');
const randtoken = require('rand-token');
const useMiddleware = require('../helpers/index');
const emailPasswordValidation = require('../middlewares/validations');

const myToken = randtoken.generate(16);

const middlewareValidation = useMiddleware();

const route = express();

const FILE = 'crush.json';

const PATH = '/crush';

route.get('/crush', (req, res) => {
    const file = fs.readFileSync(FILE, { encoding: 'utf-8', flag: 'r' });
    const crushData = JSON.parse(file);

   if (crushData.length !== 0) {
       res.status(200).send(crushData);
    } 
    res.status(200).send([]);
});

route.get(`${PATH}/:id`, async (req, res) => {
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
  
  route.post('/login', emailPasswordValidation, (req, res) => {
    res.status(200).send({
      token: myToken,
    });
  });

route.post(PATH, middlewareValidation, (req, res) => {
  const { name, age, date } = req.body;
  const file = fs.readFileSync(FILE, { encoding: 'utf-8', flag: 'r' });

  const data = JSON.parse(file);

  const id = data.length + 1;
  const lastCrush = { id, name, age, date };
  const lastFile = [...data, lastCrush];

  fs.writeFileSync(FILE, JSON.stringify(lastFile));
  res.status(201).send({ id, name, age, date });
});

route.put(`${PATH}/:id`, middlewareValidation, (req, res) => {
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

route.delete(`${PATH}/:id`, middlewareValidation, (req, res) => {
  const { id } = req.params;
  const file = fs.readFileSync(FILE, { encoding: 'utf-8', flag: 'r' });
  const data = JSON.parse(file);

  const notDeleted = data.filter((item) => item.id !== Number(id));
 
  fs.writeFileSync(FILE, JSON.stringify(notDeleted));
  res.status(200).send({ message: 'Crush deletado com sucesso' });
});

module.exports = route;