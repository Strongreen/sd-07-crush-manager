const fs = require('fs');
const { getCrushOnFile } = require('../services');

const createCrush = async (req, res) => {
  const file = await getCrushOnFile();

  const { name, age, date } = req.body;
  const id = file.length + 1;

  const newCrush = ({ name, age, id, date });
  file.push(newCrush);

  fs.promises.writeFile('./crush.json', JSON.stringify(file));
  return res.status(201).json(newCrush);
  // return res.status(201).json('Deu bom!!!');
};

module.exports = { createCrush };
