const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const crushData = require('../crush.json');
const { hasToken, isValidName, isValidAge, isValidDate } = require('../middlewares');

const app = express();

app.use(bodyParser.json());
const SUCCESS = 200;
const ERROR = 404;

app
  .route('/')
    .get(async (_request, response) => {
      await response.status(SUCCESS).send(crushData);
    })
    .post(hasToken, isValidName, isValidAge, isValidDate, async (request, response) => {
      const { name, age, date } = request.body;
      const id = crushData.length + 1;
      const newCrush = { id, name, age, date };
      const newData = [...crushData, newCrush];
      await fs.promises.writeFile(`${__dirname}/../crush.json`, JSON.stringify(newData));
      response.status(201).send(newCrush);
    });

app.get('/:id', async (request, response) => {
  const { id } = request.params;
  const crush = await crushData.find(({ id: crushId }) => +id === +crushId);

  if (!crush) {
    const message = { message: 'Crush não encontrado' };
    response.status(ERROR).send(message);
  } else {
    response.status(SUCCESS).send(crush);
  }
});

module.exports = app;