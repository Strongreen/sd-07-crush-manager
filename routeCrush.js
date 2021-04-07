const express = require('express');
const fs = require('fs');

const dataPath = './crush.json';
const middlewares = require('./middlewares');

const app = express();

// requisito 1
app.get('/', (_req, res) => {
  const crushes = JSON.parse(fs.readFileSync(dataPath), 'utf-8');
  res.status(200).send(crushes);
});

// requisito 7
app.get('/search', middlewares.token, (req, res) => {
  const crushes = JSON.parse(fs.readFileSync(dataPath), 'utf-8');
  const { q } = req.query;
  
  if (q) {
    const filteredCrushes = crushes.filter((crush) => crush.name.includes(q));
    return res.status(200).send((filteredCrushes) || []);
  }
  return res.status(200).send(crushes);
});

// requisito 2
app.get('/:reqid', (req, res) => {
  const { reqid } = req.params;
  const crushes = JSON.parse(fs.readFileSync(dataPath), 'utf-8');
  const crushIndex = crushes.findIndex(({ id }) => id === Number(reqid));
  if (!reqid.includes('search')) {
    if (crushIndex === -1) {
      return res.status(404).json({ message: 'Crush não encontrado' });
    }
    return res.send(crushes[crushIndex]);
  }
  return null;
});

app.use(middlewares.token);

// requisito 6
app.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const index = id - 1;
  const crushes = JSON.parse(fs.readFileSync(dataPath), 'utf-8');
  crushes.splice(index, 1);

  try {
    await fs.promises.writeFile(dataPath, JSON.stringify(crushes));
    res.status(200).send({ message: 'Crush deletado com sucesso' });
  } catch (error) {
    throw new Error(error);
  }
});

app.use(middlewares.verifyNameAge);
app.use(middlewares.verifyDate);

// requisito 4
app.post('/', async (req, res) => {
  const crushes = JSON.parse(fs.readFileSync(dataPath), 'utf-8');
  const size = crushes.length;
  crushes[size] = {
    name: req.body.name,
    age: req.body.age,
    id: size + 1,
    date: req.body.date,
  };

  try {
    await fs.promises.writeFile(dataPath, JSON.stringify(crushes));
    res.status(201).send(crushes[size]);
  } catch (error) {
    throw new Error(error);
  }
});

// requisito 5
app.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, age, date } = req.body;
  const crushes = JSON.parse(fs.readFileSync(dataPath), 'utf-8');
  crushes[id - 1].name = name;
  crushes[id - 1].age = age;
  crushes[id - 1].date = date;

  try {
    await fs.promises.writeFile(dataPath, JSON.stringify(crushes));
    res.status(200).send({ id: parseInt(id, 10), name, age, date });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = app;
