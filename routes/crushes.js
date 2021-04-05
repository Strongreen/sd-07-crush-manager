const express = require('express');
const fs = require('fs');
const data = require('../crush.json');

const app = express();

app.get('/', (req, res) => {
  const size = data.length;
  if (size === 0) {
    res.status(200).send([]);
  }
  res.status(200).send(data);
});

app.post('/', async (req, res) => {
  const size = data.length;
  data[size] = {
    name: req.body.name,
    age: req.body.name,
    id: size + 1,
    date: {
      datedAt: req.body.datedAt,
      rate: req.body.rate,
    },
  };
  try {
    await fs.promises.writeFile(`${__dirname}/../crush.json`, JSON.stringify(data));
    res.status(201).send({
      message: 'Salvo com sucesso!',
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = app;
