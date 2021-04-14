const express = require('express');
const rescue = require('express-rescue');
const fs = require('fs');
const middleware = require('../middlewares');

const app = express();

const readData = async () => {
  const data = JSON.parse(await fs.promises.readFile('./crush.json', 'utf-8'));
  return data;
};

app.get('/', async (req, res) => {
  const data = await readData();
  return res.status(200).send(data);
});

app.get('/search', middleware.authorizationMiddleware, async (req, res) => {
  const { q } = req.query;
  const search = q;
  const data = await readData();
  const searchCrushName = data.filter((n) => n.name.includes(search));

  if (!q) {
    return res.status(200).send(data);
  }

  if (!searchCrushName) {
    return res.status(200).send([]);
  }

  return res.status(200).send(searchCrushName);
});

app.get('/:id', async (req, res) => {
  const data = await readData();
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
  const dataFile = await readData();
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
  const dataFile = await readData();
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
  const dataFile = await readData();
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
