const fs = require('fs').promises;
const express = require('express');
const rescue = require('express-rescue');
// const helpers = require('./helpers');

const crushRoute = express.Router();

const {
  idGenerator,
  nameValidator,
  ageValidator,
  datedAtValidator,
  rateValidator,
  authCrush,
} = require('./helpers').crushRouteHelper;

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
    const getItem = result.find((personalData) => personalData.id === Number(id));
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

crushRoute.post(
  '/',
  authCrush,
  nameValidator,
  ageValidator,
  datedAtValidator,
  rateValidator,
  rescue(async (req, res) => {
    try {
      const { name, age, date } = req.body;
      const oldResult = await readCrushFile();
      const params = { id: idGenerator(oldResult), name, age, date };
      const newResult = [...oldResult, params];
      await writeCrushFile(newResult);
      res.status(NEW_FILE).json(params);
    } catch (error) {
      res.status(INTERNAL_ERROR).json({ message: error.message });
    }
  }),
);

crushRoute.put(
  '/:id',
  authCrush,
  nameValidator,
  ageValidator,
  datedAtValidator,
  rateValidator,
  rescue(async (req, res) => {
    try {
      const { name, age, date } = req.body;
      const result = await readCrushFile();
      const { id } = req.params;
      const getIndex = result.filter((personalData) => personalData.id).indexOf(id);
      result[getIndex] = { id: Number(id), name, age, date };
      await writeCrushFile(result);
      res.status(SUCESSS).json(result[getIndex]);
    } catch (error) {
      res.status(BAD_REQUEST).json({ message: error.message });
    }
  }),
);

crushRoute.delete(
  '/:id',
  authCrush,
  rescue(async (req, res) => {
    try {
      const { id } = req.params;
      const oldResult = await readCrushFile();
      const newResult = oldResult.filter((personalData) => personalData.id !== Number(id));
      await writeCrushFile(newResult);
      res.status(SUCESSS).json({ message: 'Crush deletado com sucesso' });
    } catch (error) {
      res.status(INTERNAL_ERROR).json({ message: error.message });
    }
  }),
);

module.exports = crushRoute;