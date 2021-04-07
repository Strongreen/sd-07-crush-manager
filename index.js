const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const helpers = require('./helper/validateCreate');
const desafio1 = require('./desafio1');
// const desafio2 = require('./desafio2');
const desafio3 = require('./desafio3');
const desafio4 = require('./desafio4');
const desafio5 = require('./desafio5');
const desafio6 = require('./desafio6');
// const desafio7 = require('./desafio7');
const middlewares = require('./middlewares/validateToken');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(desafio1);
app.use(desafio3);

app.get('/crush/search', middlewares.validateToken, async (req, res) => {
  const crush = JSON.parse(await fs.readFile('./crush.json', 'utf8'));
  try {
    const filterName = helpers.filterByName(crush, req.query.q);
    res.status(200).json(filterName);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

app.get('/crush/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const crush = JSON.parse(await fs.readFile('./crush.json'));
    const filter = crush.filter((person) => person.id === parseInt(id, 10));
    if (filter.length > 0) {
      res.status(200).json(filter[0]);
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(404).json({
      message: 'Crush não encontrado',
    });
  }
});

app.use(middlewares.validateToken, desafio4);
app.use(middlewares.validateToken, desafio5);
app.use(middlewares.validateToken, desafio6);

app.listen(PORT, () => {
  console.log('Online');
});
