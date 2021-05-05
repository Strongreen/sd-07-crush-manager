const express = require('express');
const { writeFile, readFile } = require('../services/readAndWrite');

const app = express();
app.use(express.json());

const newCrush = async (name, age, date) => {
  const dataCrushes = await readFile();
  const lastId = dataCrushes[dataCrushes.length - 1].id;
  const newCrushObject = {
    id: lastId + 1,
    name,
    age,
    date,
  };
  const newDataCrushes = [...dataCrushes, newCrushObject];
  await writeFile(newDataCrushes);
  return newCrushObject;
};

module.exports = newCrush;
