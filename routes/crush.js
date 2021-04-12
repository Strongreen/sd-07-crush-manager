const express = require('express');
const fs = require('fs');
const validate = require('../helpers/validateCrushAttributes');
const tokenValidateMiddleware = require('../middlewares/tokenValidate');
// const data = require('../crush.json');

const app = express();

const readingFile = async () => {
  const file = await fs.promises.readFile(`${__dirname}/../crush.json`);
  return JSON.parse(file);
};

const validateAttributes = (name, age, date) => {
  validate.validateName(name);
  validate.validateAge(age);
  validate.validateDate(date);
  validate.validateDatedAt(date.datedAt);
  validate.validateRate(date.rate);
};

app.get('/', async (req, res) => {
  const toRead = await readingFile();
  res.status(200).send(toRead);
});

app.get('/:id', async (req, res) => {
  const readFileF = await readingFile();
  
  const { id } = req.params;
  const getId = readFileF.find((findId) => findId.id === parseFloat(id));

  if (!getId) {
    return res.status(404).json({
      message: 'Crush não encontrado',
    });
  }

  return res.status(200).json(getId);
});

app.post('/', tokenValidateMiddleware, async (req, res) => {
  const { name, age, date } = req.body;
  const data = await readingFile();
  const size = data.length;
    data[size] = {
    id: size + 1,
    name,
    age,
    date,
  };
  try {
    validateAttributes(name, age, date);
    await fs.promises.writeFile('./crush.json', JSON.stringify(data));
    res.status(201).json(data[size]);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
  });

module.exports = app;