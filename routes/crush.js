const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const crushData = require('../crush.json');
const { hasToken, isValidName, isValidAge, isValidDate } = require('../middlewares');
const { read } = require('../services');

const router = express.Router();

router.use(bodyParser.json());
const SUCCESS = 200;
const ERROR = 404;

router
  .route('/')
    .get(async (_request, response) => {
        const currentData = await read(`${__dirname}/../crush.json`);
        const dataParse = JSON.parse(currentData);
        response.status(SUCCESS).send(dataParse);
    })
    .post(
      hasToken, isValidName, isValidAge, isValidDate,
      async (request, response) => {
        const { name, age, date } = request.body;
        const id = crushData.length + 1;
        const newCrush = { id, name, age, date };
        const currentData = JSON.parse(read('../crush.json'));
        const newData = [...currentData, newCrush];
        await fs.promises.writeFile(`${__dirname}/../crush.json`, JSON.stringify(newData));
        response.status(201).send(newCrush);
      },
    );

router.get('/search', hasToken, async (request, response) => {
  const { q: query } = request.query;
  const currentData = await read(`${__dirname}/../crush.json`);
  const data = JSON.parse(currentData)
    .filter(({ name }) => name.toLowerCase().includes(query.toLowerCase()));
  response.status(SUCCESS).send(data);
});

router
  .route('/:id')
    .get(async (request, response) => {
      const id = parseInt(request.params.id, 10);
      const crush = await crushData.find(({ id: crushId }) => id === +crushId);

      if (!crush) {
        const message = { message: 'Crush não encontrado' };
        response.status(ERROR).send(message);
      } else {
        response.status(SUCCESS).send(crush);
      }
    })
    .put(
      hasToken, isValidName, isValidAge, isValidDate,
      async (request, response) => {
        const { name, age, date } = request.body;
        const id = parseInt(request.params.id, 10);
        const newCrush = { id, name, age, date };
        const oldData = crushData.filter(({ id: crushId }) => id !== +crushId);
        const newData = [...oldData, newCrush];
        await fs.promises.writeFile(`${__dirname}/../crush.json`, JSON.stringify(newData));
        response.status(SUCCESS).send(newCrush);
      },
    )
    .delete(
      hasToken,
      async (request, response) => {
        const id = parseInt(request.params.id, 10);
        const newData = crushData.filter(({ id: crushId }) => id !== +crushId);
        await fs.promises.writeFile(`${__dirname}/../crush.json`, JSON.stringify(newData));
        response.status(SUCCESS).send({ message: 'Crush deletado com sucesso' });
      },
    );

module.exports = router;