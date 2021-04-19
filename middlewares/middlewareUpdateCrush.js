// const fs = require('fs');
const { getCrushOnFile } = require('../services');

const updateCrush = async (req, res) => {
  const file = await getCrushOnFile();

  const { params: { id } } = req;

  const numberID = parseFloat(id);
  const { name, age, date } = req.body;

  const localizedCrush = file.find((crush) => crush.id === numberID);
  localizedCrush.name = name;
  localizedCrush.age = age;
  localizedCrush.date = date;

  return res.status(200).json(localizedCrush);
  // return res.status(201).json('Deu bom!!!');
};

module.exports = { updateCrush };
