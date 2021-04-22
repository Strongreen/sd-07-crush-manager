const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const route = express.Router();

const dataDirectory = path.join(__dirname, '../../crush.json');

route.get('/crush/:id', async (req, res) => {
  let crushes = await fs.readFile(dataDirectory);
  crushes = JSON.parse(crushes);
  const { id } = req.params;
  const crushFinded = crushes.filter((crush) => crush.id === +id)[0];
  if (!crushFinded) return res.status(404).json({ message: 'Crush não encontrado' });
  return res.status(200).json(crushFinded);
});

module.exports = route;