const fs = require('fs').promises;
const express = require('express');
const crushData = require('../crush.json');

const crushRoute = express.Router();

const SUCESSS = 200;
// const BAD_REQUEST = 400;
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

// const writeCrushFile = async () => {
//   try {
//     await fs.writeFile(`${__dirname}/../crush.json`, JSON.stringify(crushData));
//   } catch (error) {
//     throw new Error('Erro na escrita do arquivo!');
//   }
// };

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

// crushRoute.post('/crush', async (req, res) => {
//   try {
//     const { name, age, date: { datedAt, rate } } = req.body;
//   } catch (error) {
    
//   }
// });

module.exports = crushRoute;