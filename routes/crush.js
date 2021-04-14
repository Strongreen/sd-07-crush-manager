const express = require('express');
const rescue = require('express-rescue');
const fs = require('fs');
const dataFile = require('../crush.json');
const middleware = require('../middlewares');

const app = express();

app.get('/', async (req, res) => {
  const data = await JSON.parse(await fs.promises.readFile('./crush.json', 'utf-8'));
  return res.status(200).send(data);
});

app.get('/:id', async (req, res) => {
  const data = await JSON.parse(await fs.promises.readFile('./crush.json', 'utf-8'));
  const { id } = req.params;
  const crushById = data.find((c) => c.id === parseInt(id, 10));

  if (!crushById) {
    return res.status(404).send({
      message: 'Crush não encontrado',
    });
  }

  return res.status(200).send(crushById);
});

app.use(middleware.authorizationMiddleware);

app.delete('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const index = id - 1;
  dataFile.splice(index, 1);

  try {
    await fs.promises.writeFile(`${__dirname}/../crush.json`, JSON.stringify(dataFile));
    return res.status(200).send({
      message: 'Crush deletado com sucesso',
    });
  } catch (error) {
    throw new Error(error);
  }
}));

app.use(middleware.nameMiddleware);
app.use(middleware.ageMiddleware);
app.use(middleware.dateMiddleware);

app.post('/', rescue(async (req, res) => {
  const { name, age, date } = req.body;
  const size = dataFile.length;
  dataFile[size] = {
    id: parseInt(`${size + 1}`, 10),
    name: `${name}`,
    age: parseInt(`${age}`, 10),
    date: {
      datedAt: `${date.datedAt}`,
      rate: parseInt(`${date.rate}`, 10),
    },
  };

  try {
    await fs.promises.writeFile(`${__dirname}/../crush.json`, JSON.stringify(dataFile));
    return res.status(201).send(dataFile[size]);
  } catch (error) {
    throw new Error(error);
  }
}));

app.put('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const { name, age, date } = req.body;
  dataFile[id - 1] = {
    name: `${name}`,
    age: parseInt(`${age}`, 10),
    date: {
      datedAt: `${date.datedAt}`,
      rate: parseInt(`${date.rate}`, 10),
    },
  };

  try {
    await fs.promises.writeFile(`${__dirname}/../crush.json`, JSON.stringify(dataFile));
    return res.status(200).send(dataFile[id - 1]);
  } catch (error) {
    throw new Error(error);
  }
}));

module.exports = app;
