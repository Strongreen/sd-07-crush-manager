const express = require('express');
const fs = require('fs');
const randtoken = require('rand-token');

  const myToken = randtoken.generate(16);

const routes = express();

const FILE = 'crush.json';

routes.get('/', (req, res) => {
    const file = fs.readFileSync(FILE);
    const dataCrush = file.toString('utf-8');    
    const crushData = JSON.parse(dataCrush);

   if (crushData.length !== 0) {
       res.status(200).send(crushData);
    } 
    res.status(200).send([]);
}).get('/:id', async (req, res) => {
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

routes.post('/', (req, res) => {
  res.status(200).send({
    token: myToken,
  });
});

module.exports = routes;