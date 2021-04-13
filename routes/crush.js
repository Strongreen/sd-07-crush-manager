const express = require('express');
const rescue = require('express-rescue');
const fs = require('fs');
const dataFile = require('../crush.json');

const app = express();

app.get('/', async (req, res) => {
  const data = await JSON.parse(await fs.promises.readFile('./crush.json', 'utf-8'));
  res.status(200).send(data);
});

app.get('/:id', async (req, res) => {
  const data = await JSON.parse(await fs.promises.readFile('./crush.json', 'utf-8'));
  const { id } = req.params;
  const crushById = data.find((c) => c.id === parseInt(id, 10));

  if (!crushById) {
    res.status(404).send({
      message: 'Crush não encontrado',
    });
  }

  res.status(200).send(crushById);
});

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
    res.status(201).send(dataFile[size]);
  } catch (error) {
    throw new Error(error);
  }
}));

module.exports = app;
