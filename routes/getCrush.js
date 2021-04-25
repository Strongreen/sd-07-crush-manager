const fs = require('fs').promises;
const express = require('express');
const rescue = require('express-rescue');
const helpers = require('./helpers');

const crushRoute = express.Router();

const {
  newCrush,
  idGenerator,
  authCrush,
} = helpers.crushRouteHelper;

const SUCESSS = 200;
const NEW_FILE = 201;
const BAD_REQUEST = 400;
// const UNAUTHORIZED = 401;
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
    res.status(SUCESSS).json(result);
  } catch (err) {
    res.status(INTERNAL_ERROR).json({
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
      return res.status(SUCESSS).json(getItem);
    }
    return res.status(NOT_FOUND).json({
      message: 'Crush não encontrado',
    });
  } catch (err) {
    return res.status(INTERNAL_ERROR).json({
      message: 'Erro na requisição id do crush!',
    });
  }
});

crushRoute.post('/', rescue(async (req, res) => {
  try {
    authCrush(req, res);
    const { name, age, date } = req.body;
    const oldResult = await readCrushFile();
    const params = { id: idGenerator(oldResult), name, age, date };
    const newResult = [...oldResult, params];
    await writeCrushFile(newResult);
    newCrush(req, res);
    res.status(NEW_FILE).json(params);
  } catch (error) {
   res.status(BAD_REQUEST).json({ message: error.message });
  }
}));

module.exports = crushRoute;