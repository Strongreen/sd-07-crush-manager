const fs = require('fs').promises;
const express = require('express');
const helpers = require('./helpers');

const crushRoute = express.Router();

const {
  nameValidator,
  ageValidator,
  datedAtValidator,
  rateValidator,
  dateValidator,
} = helpers.crushRouteHelper;

const SUCESSS = 200;
const NEW_FILE = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_ERROR = 500;

const readCrushFile = async () => {
  try {
    const crush = await fs.readFile(`${__dirname}/../crush.json`, 'utf8');
    return JSON.parse(crush);
  } catch (err) {
    throw new Error('Erro na leitura do arquivo!');
  }
};

const writeCrushFile = async (content) => {
  try {
    await fs.writeFile(`${__dirname}/../crush.json`, JSON.stringify(content));
  } catch (error) {
    throw new Error('Erro na escrita do arquivo!');
  }
};

crushRoute.get('/', async (req, res) => {
  try {
    const result = await readCrushFile();
    res.status(SUCESSS).send(result);
  } catch (err) {
    res.status(INTERNAL_ERROR).send({
      message: 'Erro na requisição do crush!',
    });
  }
});

crushRoute.get('/:id', async (req, res) => {
  try {
    const result = await readCrushFile();
    const { id } = req.params;
    const getItem = await result.find((personalData) => personalData.id === Number(id));
    if (getItem) {
      return res.status(SUCESSS).send(getItem);
    }
    return res.status(NOT_FOUND).send({
      message: 'Crush não encontrado',
    });
  } catch (err) {
    return res.status(INTERNAL_ERROR).send({
      message: 'Erro na requisição id do crush!',
    });
  }
});

crushRoute.post('/', async (req, res) => {
  try {
    const oldResult = await readCrushFile();
    const { name, age, date } = req.body;
    nameValidator(name);
    ageValidator(age);
    dateValidator(date);
    datedAtValidator(date);
    rateValidator(date);
    const newResult = oldResult.push({ name, age, date });
    await writeCrushFile(newResult);
    res.status(NEW_FILE).send({ message: 'Deu bom!' });
  } catch (error) {
   res.status(BAD_REQUEST).send({
     message: error.message,
   });
  }
});

module.exports = crushRoute;