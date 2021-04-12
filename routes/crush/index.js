const express = require('express');
const fs = require('fs').promisses;

const Crush = express.Router();

const OK = 200;
const FAIL = 404;

const readFiles = async () => {
  const data = JSON.parse(await fs.readFile(`${__dirname}/../crush.json`));
  return data;
};

const crushFinder = (allCrushes, crushId) => (
  allCrushes.find((crush) => crush.id === Number(crushId))
);

Crush.get('/', async (_req, res) => {
  try {
    return res.status(OK).send(await readFiles());
  } catch (error) {
    console.log(error);
  }
});

Crush.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const failMsg = { msg: 'Crush não encontrado' };
    const data = await readFiles();
    const theCrush = crushFinder(data, id);

    if (theCrush) return res.status(OK).json(theCrush);
    return res.status(FAIL).json(failMsg);
  } catch (error) {
    console.log(error);
  }
});

module.exports = Crush;
