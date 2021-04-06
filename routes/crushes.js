const express = require('express');
const fs = require('fs');

const app = express();

app.get('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync(__dirname + '/../crush.json', 'utf8'));
  console.log(data);
  res.status(200).send(data);
});

app.post('/', async (req, res) => {
  const data = await fs.promises.readFile(__dirname + '/../crush.json');
  const size = data.length;
  data[size] = {
    name: req.body.name,
    age: req.body.name,
    id: size + 1,
    date: { datedAt: req.body.datedAt, rate: req.body.rate },
  };
  try {
    await fs.promises.writeFile(`${__dirname}/../crush.json`, JSON.stringify(data));
    res.status(201).send({
      message: 'Salvo com sucesso!',
    });
  } catch (error) { throw new Error(error) }
});

app.put('/:id', async (req, res) => {
  const data = await fs.promises.readFile(__dirname + '/../crush.json');
  const size = data.length;
  data[id - 1] = {
    name: req.body.name,
    age: req.body.name,
    id: size + 1,
    date: { datedAt: req.body.datedAt, rate: req.body.rate },
  };
  try {
    await fs.promises.writeFile(`${__dirname}/../crush.json`, JSON.stringify(data));
    res.status(201).send({
      message: 'Salvo com sucesso!',
    });
  } catch (error) { throw new Error(error) }
});

module.exports = app;
