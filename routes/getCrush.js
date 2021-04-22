const fs = require('fs').promises;
const express = require('express');

const router = express.Router();

const SUCESSS = 200;
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

router.get('/', async (req, res) => {
  try {
    const result = await readCrushFile();
    res.status(SUCESSS).send(result);
  } catch (err) {
    res.status(INTERNAL_ERROR).send({
      message: 'Erro na requisição do crush!',
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await readCrushFile();
    const { id } = req.params;
    const getItem = await result.find((personalData) => personalData.id === Number(id));
    if (getItem) {
      res.status(SUCESSS).send(getItem);
    }
    res.status(NOT_FOUND).send({
      message: 'Crush não encontrado',
    });
  } catch (err) {
    res.status(INTERNAL_ERROR).send({
      message: 'Erro no id do crush!',
    });
  }
});

module.exports = router;